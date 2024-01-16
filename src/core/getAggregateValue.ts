import { AggregateType } from '../types/analysisTypes';
import { TableColumnData } from '../types/tableTypes';

const getAggregateValue = (
    columnData: TableColumnData,
    type: AggregateType,
): number | 'NaN' => {
    const data: number[] = [];
    for (let row in columnData) {
        data.push(parseInt(columnData[row]));
    }
    try {
        switch (type) {
            case 'maximum':
                return Math.max(...data);
            case 'minimum':
                return Math.min(...data);
            default:
                return 0;
        }
    } catch (error) {
        return 'NaN';
    }
};

export default getAggregateValue;
