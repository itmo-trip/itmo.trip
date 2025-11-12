/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserResponse } from '../models/UserResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../../OpenAPI.custom';
import { request as __request } from '../../request.custom';
export class MeService {
    /**
     * Get current user's information
     * @returns UserResponse Successful operation
     * @throws ApiError
     */
    public static getApiV1Me(): CancelablePromise<UserResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/me',
            errors: {
                401: `Unauthorized`,
            },
        });
    }
}
