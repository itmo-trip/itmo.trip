import type { IAuthor } from "./IAuhor.ts";

export interface ITrip {
    author: IAuthor,
    departure_coords: [number, number],
    arrival_coords: [number, number],
    arrival_time: Date,
    transport_type: string,
    trip_frequency: string,
    comment: string
}