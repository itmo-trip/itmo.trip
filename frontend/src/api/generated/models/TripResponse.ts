/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LocationResponse } from './LocationResponse';
import type { TransportTypeResponse } from './TransportTypeResponse';
import type { UserResponse } from './UserResponse';
export type TripResponse = {
    id?: string;
    arrival_location?: LocationResponse;
    arrival_time?: string | null;
    comment?: string | null;
    creator?: UserResponse;
    departure_location?: LocationResponse;
    departure_time?: string | null;
    series_id?: string | null;
    status?: string;
    transport_type?: TransportTypeResponse;
};

