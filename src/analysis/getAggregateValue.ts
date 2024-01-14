import { AggregateType } from '../redux/analysisSlice';
import { TableNumberColumn } from '../redux/tableSlice';

const getAggregateValue = (
    columnData: TableNumberColumn,
    type: AggregateType,
): number => {
    const data: number[] = [];
    for (let row in columnData) {
        data.push(columnData[row]);
    }

    switch (type) {
        case 'maximum':
            return Math.max(...data);
        case 'minimum':
            return Math.min(...data);
        default:
            return 0;
    }
};

export default getAggregateValue;
