import { dummyTableData } from '../data/dummyData';
import { mapData } from '../data/mapData';
import { OpviaTableColumn } from '../types/tableTypes';
import { Analysis, OpviaTableState } from './tableSlice';

const getInitialTableState = () => {
    const initialColumnsState: OpviaTableColumn[] = [
        {
            columnName: 'Time',
            columnType: 'time',
            columnId: 'time_col',
            columnIndex: 0,
            columnUnits: 'date and time',
        },
        {
            columnName: 'Cell Density',
            columnType: 'number',
            columnId: 'var_col_1',
            columnIndex: 1,
            columnUnits: 'Cell Count/Litre',
        },
        {
            columnName: 'Volume',
            columnType: 'number',
            columnId: 'var_col_2',
            columnIndex: 2,
            columnUnits: 'Litres',
        },
    ];

    const initialAggregatesState: Analysis = {
        aggregates: [
            {
                type: 'maximum',
                columnIndex: 1,
                value: 5297,
                aggregateId: 'agg_maximum_1',
            },
            {
                type: 'minimum',
                columnIndex: 1,
                value: 3,
                aggregateId: 'agg_minimum_2',
            },
            {
                type: 'minimum',
                columnIndex: 2,
                value: 24,
                aggregateId: 'agg_minimum_3',
            },
        ],
    };

    const initialState: OpviaTableState = {
        data: mapData(dummyTableData),
        columns: initialColumnsState,
        analysis: initialAggregatesState,
    };

    return initialState;
};

export default getInitialTableState;
