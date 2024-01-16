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
import getHeaderCellRenderer from './getHeaderCellRenderer';

const OpviaTable: React.FC = () => {
    const { data, columns } = useAppSelector((state) => state.table);


    
    const cols = columns.map((column) => {
        return (
            <Column
                key={`${column.columnId}`}
                cellRenderer={getCellRenderer(column, data)}
                columnHeaderCellRenderer={getHeaderCellRenderer(
                    column.columnType,
                    columns
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
