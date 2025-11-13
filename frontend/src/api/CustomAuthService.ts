import AuthUtils from "../services/AuthUtils.ts";
import {API_BASE} from "./OpenAPI.custom.ts";

export function logout() {
    // TODO: необходим вызов отдельного эндпоинта для корректного выхода из системы
    AuthUtils.clearIdToken();
    AuthUtils.clearRefreshToken();
}

export async function refreshTokens(): Promise<boolean> {
    const refreshToken = AuthUtils.getRefreshToken();
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

        AuthUtils.setIdToken(data.idToken);
        AuthUtils.setRefreshToken(data.refreshToken);

        console.log("🔄 Токены обновлены");
        return true;
    } catch (err) {
        console.error("Ошибка обновления токена", err);
        logout();
        return false;
    }
}