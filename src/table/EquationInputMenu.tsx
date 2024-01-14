import { Button, ControlGroup, MenuItem } from '@blueprintjs/core';
import { ItemRenderer, Select } from '@blueprintjs/select';
import * as React from 'react';
import {
    ColumnFunction,
    ColumnFunctionOperator,
    OpviaTableColumn,
    tableActions,
} from '../redux/tableSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import TableColumnSelect from '../components/TableColumnSelect';

interface TableOperatorSelectProps {
    selectedOperator: ColumnFunctionOperator;
    onItemSelect: (
        item: ColumnFunctionOperator,
        event?: React.SyntheticEvent<HTMLElement, Event> | undefined,
    ) => void;
}

const TableOperatorSelect: React.FC<TableOperatorSelectProps> = ({
    selectedOperator,
    onItemSelect,
}) => {
    const operators: ColumnFunctionOperator[] = ['*', '/', '+', '-'];

    const selectItemRenderer: ItemRenderer<ColumnFunctionOperator> = (
        operator,
        { handleClick, handleFocus, modifiers, query },
    ) => {
        return (
            <MenuItem
                active={modifiers.active}
                disabled={modifiers.disabled}
                label={operator}
                onClick={handleClick}
                onFocus={handleFocus}
                roleStructure="listoption"
                text={operator}
                key={operator}
            />
        );
    };

    return (
        <Select<ColumnFunctionOperator>
            items={operators}
            onItemSelect={(item) => onItemSelect(item)}
            itemRenderer={selectItemRenderer}
        >
            <Button text={selectedOperator} />
        </Select>
    );
};

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

    return (
        <ControlGroup fill={false} vertical={false} style={{ padding: 8 }}>
            <TableColumnSelect
                colIndex={column.columnIndex}
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
                colIndex={column.columnIndex}
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
