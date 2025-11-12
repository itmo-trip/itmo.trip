/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LocationTypeResponse } from '../models/LocationTypeResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../../OpenAPI.custom';
import { request as __request } from '../../request.custom';
export class LocationTypesService {
    /**
     * Get all location types
     * @returns LocationTypeResponse Successful operation
     * @throws ApiError
     */
    public static getApiV1LocationTypes(): CancelablePromise<Array<LocationTypeResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/location-types',
        });
    }
}
