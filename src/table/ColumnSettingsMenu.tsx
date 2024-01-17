import { Button, ControlGroup, Divider, Menu } from '@blueprintjs/core';
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
import ChangeColumnNameInput from './ChangeColumnNameInput';

interface ColumnSettingsMenuProps {
    column: OpviaTableColumn;
    setOpenColumnMenuIndex: React.Dispatch<
        React.SetStateAction<number | undefined>
    >;
}

const ColumnSettingsMenu: React.FC<ColumnSettingsMenuProps> = ({
    column,
    setOpenColumnMenuIndex,
}) => {
    const dispatch = useAppDispatch();
    const { columns } = useAppSelector((state) => state.table);
    const [columnFunction, setColumnFunction] = React.useState<ColumnFunction>({
        ...column.columnFunction!,
    });

    const updateCol1Index = (column1: OpviaTableColumn) =>
        setColumnFunction((colFunc) => {
            return { ...colFunc, colIndex1: column1.columnIndex };
        });

    const updateCol2Index = (column2: OpviaTableColumn) =>
        setColumnFunction((colFunc) => {
            return { ...colFunc, colIndex2: column2.columnIndex };
        });

    const updateOperator = (operator: ColumnFunctionOperator) =>
        setColumnFunction((colFunc) => {
            return { ...colFunc, operator };
        });

    const handleConfirmClick = () => {
        dispatch(
            tableActions.updateColumnFunction({
                columnIndex: column.columnIndex,
                columnFunction: columnFunction,
            }),
        );
        setOpenColumnMenuIndex(undefined);
    };

    const handleColumnDelete = () => {
        dispatch(
            tableActions.deleteColumn({ columnIndex: column.columnIndex }),
        );
    };

    const filterColIndexes = columns
        .filter((col) => col.columnType !== 'number')
        .map((col) => col.columnIndex);

    return (
        <Menu style={{ padding: 16 }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                }}
            >
                <strong>Settings</strong>

                <Button
                    icon="trash"
                    intent="danger"
                    onClick={handleColumnDelete}
                    minimal={true}
                />
            </div>
            <Divider />
            <ChangeColumnNameInput
                column={column}
                onConfirmClick={() => setOpenColumnMenuIndex(undefined)}
            />
            {column.columnType === 'function' && (
                <>
                    <strong>Equation</strong>
                    <Divider />

                    <ControlGroup
                        fill={false}
                        vertical={false}
                        style={{ padding: 8 }}
                    >
                        <TableColumnSelect
                            exclusionColumnIndexes={[
                                ...filterColIndexes,
                                column.columnIndex,
                            ]}
                            selectedColumnIndex={columnFunction.colIndex1}
                            onItemSelect={updateCol1Index}
                        />
                        <TableOperatorSelect
                            selectedOperator={columnFunction.operator}
                            onItemSelect={updateOperator}
                        />
                        <TableColumnSelect
                            exclusionColumnIndexes={[
                                ...filterColIndexes,
                                column.columnIndex,
                            ]}
                            selectedColumnIndex={columnFunction.colIndex2}
                            onItemSelect={updateCol2Index}
                        />
                        <Button
                            rightIcon="confirm"
                            onClick={handleConfirmClick}
                            intent="primary"
                            text="confirm"
                        />
                    </ControlGroup>
                </>
            )}
            <Divider />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                }}
            >
                <Button
                    text="close"
                    intent="danger"
                    onClick={() => setOpenColumnMenuIndex(undefined)}
                />
            </div>
        </Menu>
    );
};

export default ColumnSettingsMenu;
