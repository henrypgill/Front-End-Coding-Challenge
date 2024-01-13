import * as React from 'react';

import {
    Cell,
    CellRenderer,
    Column,
    ColumnHeaderCell2,
    Table2,
} from '@blueprintjs/table';
import { performCalculation } from '../../core/performCalculation';
import { ColumnType, OpviaTableColumn } from '../../redux/opviaTableSlice';
import { useAppSelector } from '../../redux/store';
import EquationInputMenu from './EquationInputMenu';

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

    const getFunctionCellRenderer = (column: OpviaTableColumn) => {
        const functionCellRenderer: CellRenderer = (
            rowIndex: number,
            columnIndex: number,
        ) => {
            const colFunc = column.columnFunction!;
            const num1 = data[colFunc.colIndex1][rowIndex] as number;
            const num2 = data[colFunc.colIndex2][rowIndex] as number;
            const result = performCalculation(
                num1,
                num2,
                column.columnFunction!.operator!,
            );

            return <Cell>{String(result)}</Cell>;
        };

        return functionCellRenderer;
    };

    const getCellRenderer = (column: OpviaTableColumn) => {
        switch (column.columnType) {
            case 'function':
                return getFunctionCellRenderer(column);
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

    const columnNameRenderer = (column: OpviaTableColumn) => {
        return (
            <div>
                <div>
                    <strong>{column.columnName}</strong>
                </div>
                <div>{column.columnUnits}</div>
            </div>
        );
    };

    const functionColumnHeaderCellRenderer = (colIndex: number) => {
        const column = columns.find((col) => col.columnIndex === colIndex)!;

        const menuRenderer = () => {
            return <EquationInputMenu column={column} />;
        };

        return (
            <ColumnHeaderCell2
                nameRenderer={() => columnNameRenderer(column)}
                menuIcon={'menu'}
                menuRenderer={menuRenderer}
            ></ColumnHeaderCell2>
        );
    };

    const dataColumnHeaderCellRenderer = (colIndex: number) => {
        const column = columns.filter((col) => col.columnIndex === colIndex)[0];
        return (
            <ColumnHeaderCell2
                nameRenderer={() => columnNameRenderer(column)}
            ></ColumnHeaderCell2>
        );
    };

    const getHeaderCellRenderer = (columnType: ColumnType) => {
        switch (columnType) {
            case 'function':
                return functionColumnHeaderCellRenderer;
            default:
                return dataColumnHeaderCellRenderer;
        }
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const cols = columns.map((column) => {
        return (
            <Column
                key={`${column.columnId}`}
                cellRenderer={getCellRenderer(column)}
                columnHeaderCellRenderer={getHeaderCellRenderer(
                    column.columnType,
                )}
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
