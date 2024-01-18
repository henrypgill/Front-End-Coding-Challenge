import {
    Button,
    ControlGroup,
    Divider,
    EntityTitle,
    H4,
    H6,
    Menu,
} from '@blueprintjs/core';
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
    const [name, setName] = React.useState(column.columnName);
    const [units, setUnits] = React.useState(column.columnUnits);

    const updateColumnNameAndUnits = () => {
        dispatch(
            tableActions.updateColumnNameAndUnits({
                columnIndex: column.columnIndex,
                columnName: name,
                columnUnits: units,
            }),
        );
    };

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

    const updateColumnFunction = () => {
        dispatch(
            tableActions.updateColumnFunction({
                columnIndex: column.columnIndex,
                columnFunction: columnFunction,
            }),
        );
    };

    const handleConfirmClick = () => {
        setOpenColumnMenuIndex(undefined);
        updateColumnFunction();
        updateColumnNameAndUnits();
    };

    const handleColumnDelete = () => {
        dispatch(
            tableActions.deleteColumn({ columnIndex: column.columnIndex }),
        );
    };

    const filterColIndexes = columns
        .filter(
            (col) =>
                !(col.columnType === 'number' || col.columnType === 'function'),
        )
        .map((col) => col.columnIndex);

    return (
        <Menu style={{ padding: 16 }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: 16,
                }}
            >
                <EntityTitle
                    title={'Column Settings'}
                    subtitle={`Column Type: ${column.columnType}`}
                    heading={H4}
                />

                <Button
                    icon="trash"
                    intent="danger"
                    onClick={handleColumnDelete}
                    minimal={true}
                />
            </div>
            <div>
                <strong>Column Name and Units</strong>
                <Divider />
                <ChangeColumnNameInput
                    name={name}
                    setName={setName}
                    units={units}
                    setUnits={setUnits}
                />
            </div>
            {column.columnType === 'function' && (
                <div>
                    <strong>Equation</strong>
                    <Divider />

                    <ControlGroup
                        vertical={false}
                        style={{
                            padding: 8,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            columnGap: 8,
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                rowGap: 4,
                                width: 100,
                            }}
                        >
                            <EntityTitle title={'Column 1'} heading={H6} />
                            <TableColumnSelect
                                exclusionColumnIndexes={[
                                    ...filterColIndexes,
                                    column.columnIndex,
                                ]}
                                selectedColumnIndex={columnFunction.colIndex1}
                                onItemSelect={updateCol1Index}
                            />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                rowGap: 4,
                            }}
                        >
                            <EntityTitle title={'Operation'} heading={H6} />
                            <TableOperatorSelect
                                selectedOperator={columnFunction.operator}
                                onItemSelect={updateOperator}
                            />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                rowGap: 4,
                                width: 100,
                            }}
                        >
                            <EntityTitle title={'Column 2'} heading={H6} />
                            <TableColumnSelect
                                exclusionColumnIndexes={[
                                    ...filterColIndexes,
                                    column.columnIndex,
                                ]}
                                selectedColumnIndex={columnFunction.colIndex2}
                                onItemSelect={updateCol2Index}
                            />
                        </div>
                    </ControlGroup>
                </div>
            )}
            <Divider />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    columnGap: 8,
                }}
            >
                <Button
                    text="Close"
                    intent="danger"
                    onClick={() => setOpenColumnMenuIndex(undefined)}
                />
                <Button
                    text="Save"
                    intent="success"
                    onClick={() => handleConfirmClick()}
                />
            </div>
        </Menu>
    );
};

export default ColumnSettingsMenu;
