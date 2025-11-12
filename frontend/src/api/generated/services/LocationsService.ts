/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LocationRequest } from '../models/LocationRequest';
import type { LocationResponse } from '../models/LocationResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../../OpenAPI.custom';
import { request as __request } from '../../request.custom';
export class LocationsService {
    /**
     * Get all locations
     * @returns LocationResponse Successful operation
     * @throws ApiError
     */
    public static getApiV1Locations(): CancelablePromise<Array<LocationResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/locations',
        });
    }
    /**
     * Create a new location
     * @param requestBody
     * @returns LocationResponse Location created successfully
     * @throws ApiError
     */
    public static postApiV1Locations(
        requestBody: LocationRequest,
    ): CancelablePromise<LocationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/locations',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get current user's locations
     * @returns LocationResponse Successful operation
     * @throws ApiError
     */
    public static getApiV1LocationsMy(): CancelablePromise<Array<LocationResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/locations/my',
        });
    }
    /**
     * Get location by ID
     * @param id
     * @returns LocationResponse Successful operation
     * @throws ApiError
     */
    public static getApiV1Locations1(
        id: string,
    ): CancelablePromise<LocationResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/locations/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Location not found`,
            },
        });
    }
    /**
     * Update location
     * @param id
     * @param requestBody
     * @returns LocationResponse Location updated successfully
     * @throws ApiError
     */
    public static putApiV1Locations(
        id: string,
        requestBody: LocationRequest,
    ): CancelablePromise<LocationResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/locations/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Location does not belong to current user`,
                404: `Location not found`,
            },
        });
    }
    /**
     * Delete location
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static deleteApiV1Locations(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/locations/{id}',
            path: {
                'id': id,
            },
            errors: {
                403: `Location does not belong to current user`,
                404: `Location not found`,
            },
        });
    }
}
