import {
    Button,
    Menu,
    MenuItem,
    Popover
} from '@blueprintjs/core';
import * as React from 'react';
import { tableActions } from '../../redux/tableSlice';
import { useAppDispatch } from '../../redux/store';

const AddFxColumn: React.FC = () => {
    const dispatch = useAppDispatch();

    const addFxColumnHandler = () => {
        dispatch(tableActions.addFxColumn());
    };

    return (
        <>
            <MenuItem
                icon="derive-column"
                onClick={addFxColumnHandler}
                text="Function Column"
            ></MenuItem>
        </>
    );
};

const ColumnActionsMenu: React.FC = () => {
    const columnMenu = (
        <Menu>
            <AddFxColumn />
        </Menu>
    );

    return (
        <Popover content={columnMenu} fill={true} placement="bottom">
            <Button
                alignText="left"
                fill={true}
                icon="add-column-right"
                rightIcon="caret-down"
                text="Add Column"
            />
        </Popover>
    );
};

export default ColumnActionsMenu;
