import * as React from 'react';

import {
    Cell,
    CellRenderer,
    Column,
    ColumnHeaderCell2,
    ColumnProps,
    Table2,
} from '@blueprintjs/table';
import { dummyTableData } from '../../data/dummyData';
import {
    ColumnFunction,
    ColumnType,
    OpviaTableColumn,
} from '../../redux/opviaTableSlice';
import { useAppSelector } from '../../redux/store';


const OpviaTable: React.FC = () => {
    const { data, columns } = useAppSelector((state) => state.opviaTable);

    const emptyCellRenderer: CellRenderer = (
        rowIndex: number,
        columnIndex: number,
    ) => {
        return <Cell>{''}</Cell>;
    };

    const dataCellRenderer: CellRenderer = (
        rowIndex: number,
        columnIndex: number,
    ) => {
        const value = data[columnIndex][rowIndex];
        return <Cell>{String(value)}</Cell>;
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const getFunctionCellRenderer = (columnFunction: ColumnFunction) => {
        const functionCellRenderer: CellRenderer = (
            rowIndex: number,
            columnIndex: number,
        ) => {
            const value = data[columnIndex][rowIndex];
            return <Cell>{String(value)}</Cell>;
        };

        return functionCellRenderer;
    };

    const getCellRenderer = (
        columnType: ColumnType,
        columnFunction?: ColumnFunction,
    ) => {
        switch (columnType) {
            case 'function':
                return getFunctionCellRenderer(columnFunction);
            case 'number':
                return dataCellRenderer;
            case 'string':
                return dataCellRenderer;
            case 'time':
                return dataCellRenderer;
            default:
                return emptyCellRenderer;
        }
    };

    const functionColumnHeaderCellRenderer = () => {

    }

    const columnNameRenderer = (column: OpviaTableColumn) => {
        return (
            <div>
                <div>
                    <strong>{column.columnName}</strong>
                </div>
                <div>
                    {column.columnUnits}
                </div>
            </div>
        )
    }

    const dataColumnHeaderCellRenderer = (colIndex: number) => {
        const column = columns.filter(col => col.columnIndex === colIndex)[0]
        return (
            <ColumnHeaderCell2 nameRenderer={() => columnNameRenderer(column)}></ColumnHeaderCell2>
        )
    }


    const getHeaderCellRenderer = (columnType: ColumnType) => {
        switch (columnType) {
            case 'function':
                return dataColumnHeaderCellRenderer;
            default:
                return dataColumnHeaderCellRenderer;
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const cols = columns.map((column) => {
        return (
            <Column
                key={`${column.columnId}`}
                cellRenderer={getCellRenderer(column.columnType)}
                columnHeaderCellRenderer={getHeaderCellRenderer(column.columnType)}
                name={column.columnName}
            />
        );
    });

    return (
        <Table2
            defaultRowHeight={35}
            numRows={95}
            enableFocusedCell={true}
            enableColumnReordering={true}
        >
            {cols}
        </Table2>
    );
};

export default OpviaTable;
