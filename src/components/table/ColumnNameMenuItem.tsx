import * as React from 'react';
import {
    Button,
    Classes,
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

interface ColumnNameMenuItemProps {
    column: OpviaTableColumn;
}

const ColumnNameMenuItem: React.FC<ColumnNameMenuItemProps> = ({ column }) => {
    const dispatch = useAppDispatch();
    const [name, setName] = React.useState(column.columnName);
    const [units, setUnits] = React.useState(column.columnUnits);

    const updateColumnNameAndUnits = () => {
        dispatch(
            opviaTableActions.updateColumnNameAndUnits({
                columnIndex: column.columnIndex,
                columnName: name,
                columnUnits: units,
            }),
        );
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
            <Button icon="confirm" onClick={updateColumnNameAndUnits}>
                Confirm
            </Button>
        </ControlGroup>
    );
};

export default ColumnNameMenuItem;
