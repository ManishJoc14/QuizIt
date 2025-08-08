import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function getRelativeTime(dateString: string | Date): string {
    return dayjs(dateString).fromNow();
}

