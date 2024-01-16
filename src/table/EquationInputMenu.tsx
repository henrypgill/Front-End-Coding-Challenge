import { ControlGroup } from '@blueprintjs/core';
import * as React from 'react';
import TableColumnSelect from '../components/TableColumnSelect';
import TableOperatorSelect from '../components/TableOperatorSelect';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { tableActions } from '../redux/tableSlice';
import {
    ColumnFunction,
    ColumnFunctionOperator,
    OpviaTableColumn,
} from '../types/tableTypes';

interface EquationInputMenuProps {
    column: OpviaTableColumn;
}

interface ColumnFunctionUpdate {
    columnFunctionKey: keyof ColumnFunction;
    value: number | string;
}
interface ColumnFunctionColumnUpdate extends ColumnFunctionUpdate {
    columnFunctionKey: 'colIndex1' | 'colIndex2';
    value: number;
}
interface ColumnFunctionOperatorUpdate extends ColumnFunctionUpdate {
    columnFunctionKey: 'operator';
    value: ColumnFunctionOperator;
}

type ColumnFunctionUpdateInput =
    | ColumnFunctionColumnUpdate
    | ColumnFunctionOperatorUpdate;

const EquationInputMenu: React.FC<EquationInputMenuProps> = ({ column }) => {
    const dispatch = useAppDispatch();
    const { columns } = useAppSelector((state) => state.table);

    const updateColumnFunction = ({
        columnFunctionKey,
        value,
    }: ColumnFunctionUpdateInput) => {
        const columnFunction = { ...column.columnFunction! };
        if (columnFunctionKey === 'colIndex1') {
            columnFunction.colIndex1 = value;
        } else if (columnFunctionKey === 'colIndex2') {
            columnFunction.colIndex2 = value;
        } else if (columnFunctionKey === 'operator') {
            columnFunction.operator = value;
        }
        dispatch(
            tableActions.updateColumnFunction({
                columnIndex: column.columnIndex,
                columnFunction,
            }),
        );
    };

    const filterColIndexes = columns
        .filter((col) => col.columnType !== 'number')
        .map((col) => col.columnIndex);

    return (
        <ControlGroup fill={false} vertical={false} style={{ padding: 8 }}>
            <TableColumnSelect
                exclusionColumnIndexes={[
                    ...filterColIndexes,
                    column.columnIndex,
                ]}
                selectedColumnIndex={column.columnFunction!.colIndex1}
                onItemSelect={(item) =>
                    updateColumnFunction({
                        columnFunctionKey: 'colIndex1',
                        value: item.columnIndex,
                    })
                }
            />
            <TableOperatorSelect
                selectedOperator={column.columnFunction!.operator}
                onItemSelect={(item) =>
                    updateColumnFunction({
                        columnFunctionKey: 'operator',
                        value: item,
                    })
                }
            />
            <TableColumnSelect
                exclusionColumnIndexes={[
                    ...filterColIndexes,
                    column.columnIndex,
                ]}
                selectedColumnIndex={column.columnFunction!.colIndex2}
                onItemSelect={(item) =>
                    updateColumnFunction({
                        columnFunctionKey: 'colIndex2',
                        value: item.columnIndex,
                    })
                }
            />
        </ControlGroup>
    );
};

export default EquationInputMenu;
