/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginRequest } from '../models/LoginRequest';
import type { LoginResponse } from '../models/LoginResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../../OpenAPI.custom';
import { request as __request } from '../../request.custom';
export class AuthService {
    /**
     * Sign in
     * @param requestBody
     * @returns LoginResponse Successful operation
     * @throws ApiError
     */
    public static postApiV1AuthLogin(
        requestBody: LoginRequest,
    ): CancelablePromise<LoginResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized. Please check your credentials`,
            },
        });
    }
    /**
     * Refresh token
     * @param refresh Refresh token
     * @returns LoginResponse Successful operation
     * @throws ApiError
     */
    public static postApiV1AuthRefresh(
        refresh: string,
    ): CancelablePromise<LoginResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/refresh',
            headers: {
                'Refresh': refresh,
            },
            errors: {
                401: `Unauthorized. Please check your credentials`,
            },
        });
    }
}
