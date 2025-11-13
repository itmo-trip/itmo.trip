export default class DateTimeUtils {
    static toDateTimeString(date: Date): string {
        const format = new Intl.DateTimeFormat('sv-SE', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        return format.format(date).replace(' ', 'T');
    }

    static toMoscowDate(date: Date) {
        return new Date(date.setHours(date.getHours() + 3))
    }

    static toISOString(date: Date | undefined) {
        if (date == null) return undefined

        const pad = (num: number) => (num < 10 ? '0' : '') + num

        return date.getFullYear() +
            '-' + pad(date.getMonth() + 1) +
            '-' + pad(date.getDate()) +
            'T' + pad(date.getHours()) +
            ':' + pad(date.getMinutes()) +
            ':' + pad(date.getSeconds())
    }
}