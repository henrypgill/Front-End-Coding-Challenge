import { Button, ControlGroup } from '@blueprintjs/core';
import * as React from 'react';
import TableColumnSelect from '../components/TableColumnSelect';
import TableOperatorSelect from '../components/TableOperatorSelect';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { tableActions } from '../redux/tableSlice';
import { ColumnFunctionOperator, OpviaTableColumn } from '../types/tableTypes';

interface EquationInputMenuProps {
    targetColumn: OpviaTableColumn;
}

const ChangeColumnFunctionInput: React.FC<EquationInputMenuProps> = ({
    targetColumn,
}) => {
    const dispatch = useAppDispatch();
    const { columns } = useAppSelector((state) => state.table);
    const [column, setColumn] = React.useState<OpviaTableColumn>({
        ...targetColumn,
    });

    const updateCol1Index = (column1Index: OpviaTableColumn) =>
        setColumn((col) => {
            return {
                ...col,
                colFunc: { ...col.columnFunction, colIndex1: column1Index },
            };
        });

    const updateCol2Index = (column2Index: OpviaTableColumn) =>
        setColumn((col) => {
            return {
                ...col,
                colFunc: { ...col.columnFunction, colIndex2: column2Index },
            };
        });

    const updateOperator = (operator: ColumnFunctionOperator) =>
        setColumn((col) => {
            return {
                ...col,
                colFunc: { ...col.columnFunction, operator: operator },
            };
        });

    const handleConfirmClick = () => {
        dispatch(
            tableActions.updateColumnFunction({
                columnIndex: column.columnIndex,
                columnFunction: column.columnFunction!,
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
                onItemSelect={updateCol1Index}
            />
            <TableOperatorSelect
                selectedOperator={column.columnFunction!.operator}
                onItemSelect={updateOperator}
            />
            <TableColumnSelect
                exclusionColumnIndexes={[
                    ...filterColIndexes,
                    column.columnIndex,
                ]}
                selectedColumnIndex={column.columnFunction!.colIndex2}
                onItemSelect={updateCol2Index}
            />
            <Button
                rightIcon="confirm"
                onClick={handleConfirmClick}
                intent="primary"
                text="confirm"
            />
        </ControlGroup>
    );
};

export default ChangeColumnFunctionInput;
