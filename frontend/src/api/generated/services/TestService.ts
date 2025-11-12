/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestResponse } from '../models/TestResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TestService {
    /**
     * @returns TestResponse OK
     * @throws ApiError
     */
    public static getTest(): CancelablePromise<TestResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test',
        });
    }
}
