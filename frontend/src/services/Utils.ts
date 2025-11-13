export default class Utils {
    static getLocationTypeName(locationTypeCode: string) {
        if (locationTypeCode === 'METRO_STATION') return 'Метро'
        else if (locationTypeCode === 'UNIVERSITY_CAMPUS') return 'Кампус ИТМО'
        else if (locationTypeCode === 'DORMITORY') return 'Общежитие ИТМО'
        else if (locationTypeCode === 'CUSTOM') return 'Свой адрес'
        else return locationTypeCode
    }
}
