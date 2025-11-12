/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TransportTypeResponse } from '../models/TransportTypeResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../../OpenAPI.custom';
import { request as __request } from '../../request.custom';
export class TransportTypesService {
    /**
     * Get all transport types
     * @returns TransportTypeResponse Successful operation
     * @throws ApiError
     */
    public static getApiV1TransportTypes(): CancelablePromise<Array<TransportTypeResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/transport-types',
        });
    }
}
