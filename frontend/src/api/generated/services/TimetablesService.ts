/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TimetableResponse } from '../models/TimetableResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../../OpenAPI.custom';
import { request as __request } from '../../request.custom';
export class TimetablesService {
    /**
     * Get all timetables
     * @returns TimetableResponse Successful operation
     * @throws ApiError
     */
    public static getApiV1Timetables(): CancelablePromise<Array<TimetableResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/timetables',
        });
    }
}
