/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LocationTypeResponse } from './LocationTypeResponse';
import type { UserResponse } from './UserResponse';
export type LocationResponse = {
    id: string;
    creator?: UserResponse;
    latitude: number;
    location_type: LocationTypeResponse;
    longitude: number;
    name: string;
};

