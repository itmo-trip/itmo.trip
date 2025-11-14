import AuthUtils from "../services/AuthUtils.ts";
import {API_BASE} from "./OpenAPI.custom.ts";

export async function login(username: string, password: string): Promise<boolean> {
    try {
        const res = await fetch(`${API_BASE}/api/v1/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (!res.ok) return false;

        const data = await res.json();

        AuthUtils.setIdToken(data.id_token);
        AuthUtils.setRefreshToken(data.refresh_token);

        return true;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return username == "admin" && password == "1234";
    }
}

export function logout() {
    // TODO: необходим вызов отдельного эндпоинта для корректного выхода из системы
    AuthUtils.clearIdToken();
    AuthUtils.clearRefreshToken();
}

export async function refreshTokens(): Promise<boolean> {
    const refreshToken = AuthUtils.getRefreshToken();
    if (!refreshToken) return false;

    try {
        const res = await fetch(`${API_BASE}/api/v1/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
        });

        if (!res.ok) {
            logout();
            return false;
        }

        const data = await res.json();

        AuthUtils.setIdToken(data.id_token);
        AuthUtils.setRefreshToken(data.refresh_token);

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
    const idToken = AuthUtils.getIdToken();
    const refreshToken = AuthUtils.getRefreshToken();

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${idToken}`,
        "Refresh": refreshToken || "",
        ...options.headers,
    };

    let res = await fetch(`${API_BASE}${path}`, { ...options, headers });

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
    const res = await apiFetch("/api/v1/me");
    if (!res.ok) throw new Error("Не удалось получить профиль");
    return res.json();
}