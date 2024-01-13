import { Cell } from '@blueprintjs/table';
import { dummyTableData } from '../data/dummyData';

function formatCellDeltaTime(
    time: string | number,
    startTime: string | number | Date,
): string {
    const date = new Date(time);
    return String(date.getSeconds());
}

function formatCellNumber(value: string): string {
    return String(value);
}

