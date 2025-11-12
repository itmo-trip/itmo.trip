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
}