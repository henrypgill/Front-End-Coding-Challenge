import { AggregateType } from '../redux/analysisSlice';
import { TableColumn, TableNumberColumn } from '../redux/tableSlice';

const getAggregateValue = (
    columnData: TableColumn,
    type: AggregateType,
): number | "NaN"=> {
    
    const data: number[] = [];
    for (let row in columnData) {
        data.push(columnData[row] as number);
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
        return "NaN"
    }
};

export default getAggregateValue;
