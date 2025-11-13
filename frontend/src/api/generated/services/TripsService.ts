/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TripRequest } from '../models/TripRequest';
import type { TripResponse } from '../models/TripResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../../OpenAPI.custom';
import { request as __request } from '../../request.custom';
export class TripsService {
    /**
     * Get all trips (supports filtering)
     * @param arrivalTime Фильтр по времени прибытия.
     * Можно использовать операторы сравнения - gt (greater than), gte (greater than or equal),
     * lt (less than), lte (less than or equal), eq (equal).
     * Пример: `gt:2023-10-01T00:00:00Z`, `lt:2023-10-31T23:59:59Z`
     *
     * @param departureTime Фильтр по времени отправления.
     * Поддерживает те же операторы сравнения, что и arrival_time.
     *
     * @param arrivalLocationId Фильтр по ID места прибытия.
     * Можно указать несколько значений через запятую.
     *
     * @param departureLocationId Фильтр по ID места отправления.
     * Можно указать несколько значений через запятую.
     *
     * @param transportTypeId Фильтр по ID типа транспорта.
     * Можно указать несколько значений через запятую.
     *
     * @returns TripResponse Successful operation
     * @throws ApiError
     */
    public static getApiV1Trips(
        arrivalTime?: string,
        departureTime?: string,
        arrivalLocationId?: string,
        departureLocationId?: string,
        transportTypeId?: string,
    ): CancelablePromise<Array<TripResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/trips',
            query: {
                'arrival_time': arrivalTime,
                'departure_time': departureTime,
                'arrival_location_id': arrivalLocationId,
                'departure_location_id': departureLocationId,
                'transport_type_id': transportTypeId,
            },
            errors: {
                400: `Bad request. Please check your filtering parameters`,
            },
        });
    }
    /**
     * Create a new trip
     * @param requestBody
     * @returns TripResponse Trip created successfully
     * @throws ApiError
     */
    public static postApiV1Trips(
        requestBody: TripRequest,
    ): CancelablePromise<TripResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/trips',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid trip data`,
            },
        });
    }
    /**
     * Get trip by ID
     * @param id
     * @returns TripResponse Successful operation
     * @throws ApiError
     */
    public static getApiV1Trips1(
        id: string,
    ): CancelablePromise<TripResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/trips/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Trip not found`,
            },
        });
    }
    /**
     * Update trip
     * @param id
     * @param requestBody
     * @returns TripResponse Trip updated successfully
     * @throws ApiError
     */
    public static putApiV1Trips(
        id: string,
        requestBody: TripRequest,
    ): CancelablePromise<TripResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/trips/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Trip does not belong to current user`,
                404: `Trip not found`,
            },
        });
    }
    /**
     * Delete trip
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static deleteApiV1Trips(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/trips/{id}',
            path: {
                'id': id,
            },
            errors: {
                403: `Trip does not belong to current user`,
                404: `Trip not found`,
            },
        });
    }
}
