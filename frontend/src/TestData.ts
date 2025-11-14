import type {IAuthor} from "./models/IAuhor.ts";
import type {ITrip} from "./models/ITrip.ts";

export const authors: IAuthor[] = [
    {
        id: "1",
        name: 'Артем',
        avatar: 'https://photo.itmo.su/avatar/5a27f96a77c1de323cbc869796d80858966122f9/',
        courseNumber: 1,
        facultyName: 'ИПКН',
        tg_username: '@kalinc',
        bio: 'Много разных увлечений, увлечений, увлечений'
    },
    {
        id: "2",
        name: 'Юрий',
        avatar: 'https://avatars.githubusercontent.com/u/91129832?s=400&u=30b6fbc90706b89e125de0f35e6d0bbce0d4f973&v=4',
        courseNumber: 1,
        facultyName: 'ИПКН',
        tg_username: '@yu_ufimtsev',
        bio: 'Разработка, разработка, разработка, разработка'
    },
    {
        id: "3",
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
        id: "4",
        name: 'Тимур',
        avatar: 'https://avatars.githubusercontent.com/u/89847233?v=4',
        courseNumber: 1,
        facultyName: 'ИПКН',
        tg_username: '@tkhapchaev',
        bio: ''
    },
    {
        id: "5",
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
        transport_type: 'Общественный транспорт',
        trip_frequency: 'Каждую неделю',
        comment: 'Быстрее всего на метро, согласны?',
        firstAddr: 'Площадь Восстания',
        lastAddr: 'ИТМО на Кронверском'
    },
    {
        author: authors[1],
        departure_coords: [59.9369, 30.4801],
        arrival_coords: [59.94403, 30.2952],
        arrival_time: new Date('2025-11-25T20:30:00Z'),
        transport_type: 'Такси',
        trip_frequency: 'Разовая',
        comment: '',
        firstAddr: 'Метро Проспект Большевиков',
        lastAddr: 'ИТМО на Биржевой'
    },
    {
        author: authors[2],
        departure_coords: [59.936562064167354,30.499978000000002],
        arrival_coords: [59.92351402504148,30.376095926709972],
        arrival_time: new Date('2025-11-20T15:30:00Z'),
        transport_type: 'Общественный транспорт',
        trip_frequency: 'Каждую неделю',
        comment: 'Люблю автобусы',
        firstAddr: 'Общежитие на Белорусской',
        lastAddr: 'Миргородская 3'
    },
    {
        author: authors[3],
        departure_coords: [59.984031419684804,30.35699900879305],
        arrival_coords: [59.92646000495477,30.339519547126066],
        arrival_time: new Date('2025-11-20T20:30:00Z'),
        transport_type: 'Своя машина',
        trip_frequency: 'Каждую неделю',
        comment: 'Готов подвезти',
        firstAddr: 'Станция метро Лесная',
        lastAddr: 'ИТМО на Ломоносова'
    },
    {
        author: authors[4],
        departure_coords: [59.98401017798144,30.35052918892963],
        arrival_coords: [59.92655346472663,30.33910851753994],
        arrival_time: new Date('2025-11-20T12:00:00Z'),
        transport_type: 'Общественный транспорт',
        trip_frequency: 'Каждую неделю',
        comment: '',
        firstAddr: 'Станция метро Лесная',
        lastAddr: 'ИТМО на Ломоносова'
    },
    {
        author: authors[2],
        departure_coords: [59.92768158712746,30.36048332235471],
        arrival_coords: [59.95718670847085,30.308284464092527],
        arrival_time: new Date('2025-11-20T12:00:00Z'),
        transport_type: 'Каршеринг',
        trip_frequency: 'Каждую неделю',
        comment: '',
        firstAddr: 'Станция метро Лесная',
        lastAddr: 'ИТМО на Ломоносова'
    },
];
