import { Button, ControlGroup, InputGroup } from '@blueprintjs/core';
import * as React from 'react';
import { useAppDispatch } from '../redux/store';
import { tableActions } from '../redux/tableSlice';
import { OpviaTableColumn } from '../types/tableTypes';

interface ChangeColumnNameInputProps {
    column: OpviaTableColumn;
    onConfirmClick: () => void;
}

const ChangeColumnNameInput: React.FC<ChangeColumnNameInputProps> = ({
    column,
    onConfirmClick,
}) => {
    const dispatch = useAppDispatch();
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

    const handleConfirmClick = () => {
        onConfirmClick();
        updateColumnNameAndUnits();
    };

    return (
        <ControlGroup fill={false} vertical={false} style={{ padding: 8 }}>
            <InputGroup
                placeholder="Name"
                value={name}
                onValueChange={(val) => setName(val)}
                fill={false}
                style={{ width: 124 }}
            />
            <InputGroup
                placeholder="Units"
                value={units}
                onValueChange={(val) => setUnits(val)}
                fill={false}
                style={{ width: 124 }}
            />
            <Button
                rightIcon="confirm"
                onClick={handleConfirmClick}
                intent="primary"
            >
                Confirm
            </Button>
        </ControlGroup>
    );
};

export default ChangeColumnNameInput;
