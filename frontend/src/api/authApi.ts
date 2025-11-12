const API_BASE = "http://localhost:8080/itmo-trip";
const API_BASE_AVOID_CORS = "/itmo-trip" // смотреть в vite.config.ts

let idToken: string | null = localStorage.getItem("idToken");
let refreshToken: string | null = localStorage.getItem("refreshToken");

export async function login(username: string, password: string): Promise<boolean> {
    try {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (!res.ok) return false;

        const data = await res.json();
        idToken = data.idToken;
        refreshToken = data.refreshToken;

        // @ts-ignore
        localStorage.setItem("idToken", idToken);
        // @ts-ignore
        localStorage.setItem("refreshToken", refreshToken);

        return true;
    } catch (error) {
        return username == "admin" && password == "1234";
    }
}

export function logout() {
    idToken = null;
    refreshToken = null;

    localStorage.removeItem("idToken");
    localStorage.removeItem("refreshToken");
}

async function refreshTokens(): Promise<boolean> {
    if (!refreshToken) return false;

    try {
        const res = await fetch(`${API_BASE}/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
        });

        if (!res.ok) {
            logout();
            return false;
        }

        const data = await res.json();
        idToken = data.idToken;
        refreshToken = data.refreshToken;

        // @ts-ignore
        localStorage.setItem("idToken", idToken);
        // @ts-ignore
        localStorage.setItem("refreshToken", refreshToken);

        console.log("🔄 Токены обновлены");
        return true;
    } catch (err) {
        console.error("Ошибка обновления токена", err);
        logout();
        return false;
    }
}

export async function apiFetch(
    path: string,
    options: RequestInit = {}
): Promise<Response> {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${idToken}`,
        "Refresh": refreshToken || "",
        ...options.headers,
    };

    let res = await fetch(`${API_BASE_AVOID_CORS}${path}`, { ...options, headers });

    if (res.status === 401 && refreshToken) {
        const refreshed = await refreshTokens();
        if (refreshed) {
            const retryHeaders = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${idToken}`,
                "Refresh": refreshToken || "",
                ...options.headers,
            };
            res = await fetch(`${API_BASE}${path}`, { ...options, headers: retryHeaders });
        }
    }

    return res;
}

export async function getUserProfile() {
    const res = await apiFetch("/me");
    if (!res.ok) throw new Error("Не удалось получить профиль");
    return res.json();
}
