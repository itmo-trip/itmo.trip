import type {IAuthor} from "./models/IAuhor.ts";
import type {ITrip} from "./models/ITrip.ts";

export const authors: IAuthor[] = [
    {
        id: 1,
        name: 'Артем',
        avatar: 'https://photo.itmo.su/avatar/5a27f96a77c1de323cbc869796d80858966122f9/',
        courseNumber: 1,
        facultyName: 'ИПКН',
        tg_username: '@kalinc',
        bio: 'Много разных увлечений'
    },
    {
        id: 2,
        name: 'Юрий',
        avatar: 'https://avatars.githubusercontent.com/u/91129832?s=400&u=30b6fbc90706b89e125de0f35e6d0bbce0d4f973&v=4',
        courseNumber: 1,
        facultyName: 'ИПКН',
        tg_username: '@yu_ufimtsev',
        bio: 'Разработка, разработка, разработка, разработка'
    },
    {
        id: 3,
        name: 'Олег',
        avatar: 'https://avatars.githubusercontent.com/u/78702860?v=4',
        courseNumber: 1,
        facultyName: 'ИПКН',
        tg_username: '@jbisss',
        bio: 'В облачных сервисах тысячи задач реализуются совместно — и это всегда риск утечек. Чтобы изолировать данные,' +
            ' вендоры придумали доверенные среды выполнения (TEE): они шифруют память на уровне железа и не дают хост-системе заглянуть внутрь.' +
            ' Все бы хорошо, но есть проблемы. '
    },
    {
        id: 4,
        name: 'Тимур',
        avatar: 'https://avatars.githubusercontent.com/u/89847233?v=4',
        courseNumber: 1,
        facultyName: 'ИПКН',
        tg_username: '@tkhapchaev',
        bio: ''
    },
    {
        id: 5,
        name: 'Артем',
        avatar: '',
        courseNumber: 1,
        facultyName: 'ИПКН',
        tg_username: '@jbisss',
        bio: 'В облачных сервисах тысячи задач реализуются совместно — и это всегда риск утечек. Чтобы изолировать данные,' +
            ' вендоры придумали доверенные среды выполнения (TEE): они шифруют память на уровне железа и не дают хост-системе заглянуть внутрь.' +
            ' Все бы хорошо, но есть проблемы. '
    },
]

export const trips: ITrip[] = [
    {
        author: authors[0],
        departure_coords: [59.92768158712746,30.36048332235471],
        arrival_coords: [59.95718670847085,30.308284464092527],
        arrival_time: new Date('2025-11-25T15:30:00Z'),
        transport_type: 'Общественный',
        trip_frequency: 'Каждую неделю',
        comment: 'Быстрее всего на метро, согласны?'
    },
    {
        author: authors[1],
        departure_coords: [59.92768158712746,30.36048332235471],
        arrival_coords: [59.95718670847085,30.308284464092527],
        arrival_time: new Date('2025-11-25T20:30:00Z'),
        transport_type: 'Такси',
        trip_frequency: 'Разовая',
        comment: ''
    },
    {
        author: authors[2],
        departure_coords: [59.92768158712746,30.36048332235471],
        arrival_coords: [59.95718670847085,30.308284464092527],
        arrival_time: new Date('2025-11-20T15:30:00Z'),
        transport_type: 'Общественный',
        trip_frequency: 'Каждую неделю',
        comment: 'Люблю автобусы'
    },
    {
        author: authors[3],
        departure_coords: [59.92768158712746,30.36048332235471],
        arrival_coords: [59.95718670847085,30.308284464092527],
        arrival_time: new Date('2025-11-20T20:30:00Z'),
        transport_type: 'Машина',
        trip_frequency: 'Каждую неделю',
        comment: 'Готов подвезти'
    },
    {
        author: authors[4],
        departure_coords: [59.92768158712746,30.36048332235471],
        arrival_coords: [59.95718670847085,30.308284464092527],
        arrival_time: new Date('2025-11-20T12:00:00Z'),
        transport_type: 'Общественный',
        trip_frequency: 'Каждую неделю',
        comment: ''
    },
    {
        author: authors[2],
        departure_coords: [59.92768158712746,30.36048332235471],
        arrival_coords: [59.95718670847085,30.308284464092527],
        arrival_time: new Date('2025-11-20T12:00:00Z'),
        transport_type: 'Каршеринг',
        trip_frequency: 'Каждую неделю',
        comment: ''
    },
];
