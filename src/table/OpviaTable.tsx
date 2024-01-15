import * as React from 'react';

import { Divider, EntityTitle, Menu } from '@blueprintjs/core';
import {
    Cell,
    CellRenderer,
    Column,
    ColumnHeaderCell2,
    Table2,
} from '@blueprintjs/table';
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
        const value = parseInt(data[columnIndex][rowIndex]).toFixed(2);
        return <Cell>{String(value)}</Cell>;
    };

    const stringCellRenderer: CellRenderer = (
        rowIndex: number,
        columnIndex: number,
    ) => {
        const value = data[columnIndex][rowIndex];
        return <Cell>{String(value)}</Cell>;
    };

    const timeCellRenderer = (rowIndex: number, columnIndex: number) => {
        const dateTime = new Date(data[columnIndex][rowIndex]);

        return <Cell>{String(dateTime.toLocaleString('en-GB'))}</Cell>;
    };

    const getCellRenderer = (column: OpviaTableColumn) => {
        switch (column.columnType) {
            case 'function':
                return dataCellRenderer;
            case 'number':
                return dataCellRenderer;
            case 'string':
                return stringCellRenderer;
            case 'time':
                return timeCellRenderer;
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

    const getHeaderCellRenderer = (columnType: ColumnType) => {
        const headerCellRenderer = (colIndex: number) => {
            const column = columns.find((col) => col.columnIndex === colIndex)!;

            const menuRenderer = () => {
                return (
                    <Menu style={{ padding: 8 }}>
                        <div>
                            <strong>Settings</strong>
                        </div>
                        <Divider />
                        <ColumnNameMenuItem column={column} />
                        {columnType === 'function' && (
                            <>
                                <div>
                                    <strong>Equation</strong>
                                </div>
                                <Divider />
                                <EquationInputMenu column={column} />
                            </>
                        )}
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
        return headerCellRenderer;
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
            cellRendererDependencies={[data, columns]}
        >
            {cols}
        </Table2>
    );
};

export default OpviaTable;
