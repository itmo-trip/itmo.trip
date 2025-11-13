/* При изменении пути к файлу обновлять openapi-patch.js!! */

import type { ApiRequestOptions } from './generated/core/ApiRequestOptions';

export const API_BASE = import.meta.env.VITE_API_BASE;
export const API_BASE_AVOID_CORS = "/itmo-trip" // смотреть в vite.config.ts

type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;
type Headers = Record<string, string>;

export type OpenAPIConfig = {
    BASE: string;
    VERSION: string;
    WITH_CREDENTIALS: boolean;
    CREDENTIALS: 'include' | 'omit' | 'same-origin';
    TOKEN?: string | Resolver<string> | undefined;
    USERNAME?: string | Resolver<string> | undefined;
    PASSWORD?: string | Resolver<string> | undefined;
    HEADERS?: Headers | Resolver<Headers> | undefined;
    ENCODE_PATH?: ((path: string) => string) | undefined;
};

export const OpenAPI: OpenAPIConfig = {
    BASE: API_BASE_AVOID_CORS,
    VERSION: '1.0.0',
    WITH_CREDENTIALS: false,
    CREDENTIALS: 'include',
    TOKEN: undefined,
    USERNAME: undefined,
    PASSWORD: undefined,
    HEADERS: async (_: ApiRequestOptions): Promise<Headers> => {
        const headers: Headers = {
            'Content-Type': 'application/json',
        };

        const idToken = localStorage.getItem("idToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (idToken) headers['Authorization'] = `Bearer ${idToken}`;
        if (refreshToken) headers['Refresh'] = refreshToken!;

        return headers;
    },
    ENCODE_PATH: undefined,
};
