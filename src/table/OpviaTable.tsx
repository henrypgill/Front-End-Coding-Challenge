import * as React from 'react';

import { Divider, EntityTitle, Menu } from '@blueprintjs/core';
import {
    Column,
    ColumnHeaderCell2,
    Table2
} from '@blueprintjs/table';
import { useAppSelector } from '../redux/store';
import { ColumnType, OpviaTableColumn } from '../types/tableTypes';
import ChangeColumnFunctionInput from './ChangeColumnFunctionInput';
import ChangeColumnNameInput from './ChangeColumnNameInput';
import getCellRenderer from './getCellRenderer';

const OpviaTable: React.FC = () => {
    const { data, columns } = useAppSelector((state) => state.table);

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
                        <ChangeColumnNameInput column={column} />
                        {columnType === 'function' && (
                            <>
                                <div>
                                    <strong>Equation</strong>
                                </div>
                                <Divider />
                                <ChangeColumnFunctionInput column={column} />
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
                cellRenderer={getCellRenderer(column, data)}
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
