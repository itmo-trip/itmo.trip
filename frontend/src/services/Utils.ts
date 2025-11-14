import type {TripResponse, UserResponse} from "../api/generated";
import type {IAuthor} from "../models/IAuhor.ts";
import type {ITrip} from "../models/ITrip.ts";

export default class Utils {
    static getLocationTypeName(locationTypeCode: string) {
        if (locationTypeCode === 'METRO_STATION') return 'Метро'
        else if (locationTypeCode === 'UNIVERSITY_CAMPUS') return 'Кампус ИТМО'
        else if (locationTypeCode === 'DORMITORY') return 'Общежитие ИТМО'
        else if (locationTypeCode === 'CUSTOM') return 'Свой адрес'
        else return locationTypeCode
    }

    static mapUserToAuthor = (u: UserResponse): IAuthor => ({
        id: u.id,
        name: `${u.first_name}`,
        avatar: u.avatar_url ?? '',
        courseNumber: 1,  // Пока на бэкенде в БД не добавили это поле
        facultyName: u.faculty,
        tg_username: u.social_network_username ?? '',
        bio: u.bio ?? '',
    });

    static mapTripResponseToITrip = (t: TripResponse): ITrip => ({
        id: t.id,
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
        author: Utils.mapUserToAuthor(t.creator),
        trip_frequency: "",
        firstAddr: t.departure_location.name,
        lastAddr: t.arrival_location.name
    });

    static openUserTelegramReference = (tgName: string) => {
        const username = tgName?.replace('@', '');
        if (username) {
            window.open(`https://t.me/${username}`, "_blank", "noopener,noreferrer");
        }
    }
}


