import * as React from 'react';

import { Divider, EntityTitle, Menu } from '@blueprintjs/core';
import {
    Cell,
    CellRenderer,
    Column,
    ColumnHeaderCell2,
    Table2,
} from '@blueprintjs/table';
import { performCalculation } from '../core/performCalculation';
import { useAppSelector } from '../redux/store';
import { ColumnType, OpviaTableColumn } from '../redux/tableSlice';
import ColumnNameMenuItem from './ColumnNameMenuItem';
import EquationInputMenu from './EquationInputMenu';

const OpviaTable: React.FC = () => {
    const { data, columns } = useAppSelector((state) => state.table);

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
            <EntityTitle 
            title={column.columnName}
            subtitle={column.columnUnits}
            />
        );
    };

    const functionColumnHeaderCellRenderer = (colIndex: number) => {
        const column = columns.find((col) => col.columnIndex === colIndex)!;

        const menuRenderer = () => {
            return (
                <Menu style={{ padding: 8 }}>
                    <div>
                        <strong>Settings</strong>
                    </div>
                    <Divider />
                    <ColumnNameMenuItem column={column} />

                    <div>
                        <strong>Equation</strong>
                    </div>
                    <Divider />
                    <EquationInputMenu column={column} />
                </Menu>
            );
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
        const column = columns.find((col) => col.columnIndex === colIndex)!;

        const menuRenderer = () => {
            return (
                <Menu style={{ padding: 8 }}>
                    <div>
                        <strong>Settings</strong>
                    </div>
                    <Divider />
                    <ColumnNameMenuItem column={column} />
                </Menu>
            );
        };
        return (
            <ColumnHeaderCell2
                nameRenderer={() => columnNameRenderer(column)}
                menuIcon={'menu'}
                menuRenderer={menuRenderer}
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
            cellRendererDependencies={[data, columns]}
        >
            {cols}
        </Table2>
    );
};

export default OpviaTable;
