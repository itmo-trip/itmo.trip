/* При изменении пути к файлу обновлять openapi-patch.js!! */

import { request as generatedRequest } from "./generated/core/request.ts";
import type { ApiRequestOptions } from "./generated/core/ApiRequestOptions.ts";
import type { OpenAPIConfig } from "./generated";
import { CancelablePromise } from "./generated";
import { refreshTokens } from "./CustomAuthService.ts";
import AuthUtils from "../services/AuthUtils.ts";

/**
 * Обёртка над сгенерированным запросом с автоматическим обновлением токена
 */
export const request = <T>(
    config: OpenAPIConfig,
    options: ApiRequestOptions
): CancelablePromise<T> => {
    return new CancelablePromise(async (resolve, reject, _) => {
        try {
            const token = AuthUtils.getIdToken();

            // Проверяем срок действия токена
            if (token && AuthUtils.isTokenExpired(token)) {
                await refreshTokens();
                console.log("🔄 Токен был просрочен и обновлён");
            }

            // Выполняем основной запрос
            let result = await generatedRequest<T>(config, options);

            // Если получили 401 или 500, возможно токен устарел — пробуем ещё раз
            if (
                (result as any)?.status === 401 ||
                (result as any)?.status === 500
            ) {
                console.log("⚠️ Ошибка авторизации — пробуем обновить токен...");
                const refreshed = await refreshTokens();
                if (refreshed) {
                    console.log("✅ Токен обновлён, повторяем запрос...");
                    result = await generatedRequest<T>(config, options);
                }
            }

            resolve(result as any);
        } catch (err) {
            reject(err);
        }
    });
};
