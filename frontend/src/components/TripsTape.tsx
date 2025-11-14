import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import Filter from "./Filter";
import Trip from "./Trip";
import {type TripResponse, TripsService, type UserResponse} from "../api/generated";
import type {ITrip} from "../models/ITrip.ts";
import type {IAuthor} from "../models/IAuhor.ts";

// eslint-disable-next-line react-refresh/only-export-components
export const mapUserToAuthor = (u: UserResponse): IAuthor => ({
    id: Number(u.id),
    name: `${u.last_name} ${u.first_name}${u.middle_name ? ' ' + u.middle_name : ''}`,
    avatar: u.avatar_url ?? '',
    courseNumber: Number(u.student_id),  // <-- уточни, если иначе
    facultyName: u.faculty,
    tg_username: u.social_network_username ?? '',
    bio: u.bio ?? '',
});

// eslint-disable-next-line react-refresh/only-export-components
export const mapTripResponseToITrip = (t: TripResponse): ITrip => {
    return {
        trip_frequency: "Всегда",
        arrival_coords: [
            t.arrival_location.latitude,
            t.arrival_location.longitude
        ],
        departure_coords: [
            t.departure_location.latitude,
            t.departure_location.longitude
        ],
        arrival_time: new Date(t.arrival_time!),
        transport_type: t.transport_type.name_ru ?? "Неизвестно",
        comment: t.comment ?? "",
        author: mapUserToAuthor(t.creator)
    };
};

export default function TripsTape() {
    const [trips, setTrips] = useState<ITrip[]>([]);

    useEffect(() => {
        getTrips();
    }, []);

    const getTrips = async () => {
        try {
            const response = await TripsService.getApiV1Trips();
            const mapped = response.map(mapTripResponseToITrip);

            setTrips(mapped);
        } catch (e) {
            console.error("Ошибка:", e);
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Filter />
            <Box sx={{ width: "100%" }}>
                <Masonry columns={{ xs: 1, md: 2 }} spacing={2}>
                    {trips.map((tr, index) => (
                        <div key={index}>
                            <Trip tripData={tr} />
                        </div>
                    ))}
                </Masonry>
            </Box>
        </Box>
    );
}
