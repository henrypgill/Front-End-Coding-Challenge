import * as React from 'react';
import {
    Button,
    ControlGroup,
    Divider,
    InputGroup,
    Menu,
    MenuItem,
    Popover,
} from '@blueprintjs/core';
import { ItemRenderer, Select } from '@blueprintjs/select';
import {
    ColumnFunction,
    ColumnFunctionOperator,
    OpviaTableColumn,
    opviaTableActions,
} from '../../redux/opviaTableSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

interface TableColumnSelectProps {
    colIndex: number;
    selectedColumnIndex: number;
    onItemSelect: (
        item: OpviaTableColumn,
        event?: React.SyntheticEvent<HTMLElement, Event> | undefined,
    ) => void;
}

const TableColumnSelect: React.FC<TableColumnSelectProps> = ({
    colIndex,
    selectedColumnIndex,
    onItemSelect,
}) => {
    const columns = useAppSelector((state) => state.opviaTable).columns.filter(
        (col) => col.columnIndex !== colIndex,
    );
    const selectedColumn = columns.find(
        (col) => col.columnIndex === selectedColumnIndex,
    )!;

    const selectItemRenderer: ItemRenderer<OpviaTableColumn> = (
        column,
        { handleClick, handleFocus, modifiers, query },
    ) => {
        return (
            <MenuItem
                active={modifiers.active}
                disabled={modifiers.disabled}
                label={column.columnName}
                onClick={handleClick}
                onFocus={handleFocus}
                roleStructure="listoption"
                text={column.columnName}
                key={column.columnId}
            />
        );
    };
    console.log(selectedColumn);

    return (
        <Select<OpviaTableColumn>
            items={columns}
            onItemSelect={(item) => onItemSelect(item)}
            itemRenderer={selectItemRenderer}
        >
            <Button text={selectedColumn.columnName} />
        </Select>
    );
};

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
    const { columns } = useAppSelector((state) => state.opviaTable);
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
            opviaTableActions.updateColumnFunction({
                columnIndex: column.columnIndex,
                columnFunction,
            }),
        );
    };

    return (
        <Menu>
            <div>
                <strong>Equation</strong>
            </div>
            <Divider />
            <ControlGroup fill={true} vertical={false}>
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
                    selectedColumnIndex={column.columnFunction!.colIndex1}
                    onItemSelect={(item) =>
                        updateColumnFunction({
                            columnFunctionKey: 'colIndex2',
                            value: item.columnIndex,
                        })
                    }
                />
            </ControlGroup>
        </Menu>
    );
};

export default EquationInputMenu;
