/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserRequest } from '../models/UserRequest';
import type { UserResponse } from '../models/UserResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../../OpenAPI.custom';
import { request as __request } from '../../request.custom';
export class UsersService {
    /**
     * Get user by ID
     * @param id
     * @returns UserResponse Successful operation
     * @throws ApiError
     */
    public static getApiV1Users(
        id: string,
    ): CancelablePromise<UserResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/users/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `User not found`,
            },
        });
    }
    /**
     * Update user's bio and social network account
     * @param id
     * @param requestBody
     * @returns UserResponse User updated successfully
     * @throws ApiError
     */
    public static patchApiV1Users(
        id: string,
        requestBody: UserRequest,
    ): CancelablePromise<UserResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/users/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Forbidden. You can only update your own profile`,
            },
        });
    }
}
