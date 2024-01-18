import { Button, Menu, MenuItem, Popover } from '@blueprintjs/core';
import * as React from 'react';
import { useAppDispatch } from '../redux/store';
import { tableActions } from '../redux/tableSlice';

const AddFunctionColumnMenuItem: React.FC = () => {
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

const NavCreateColumnMenu: React.FC = () => {
    const columnMenu = (
        <Menu>
            <AddFunctionColumnMenuItem />
        </Menu>
    );

    return (
        <Popover content={columnMenu} fill={true} placement="bottom">
            <Button
                alignText="left"
                fill={true}
                icon="add-column-right"
                rightIcon="caret-down"
                text="Create Column"
            />
        </Popover>
    );
};

export default NavCreateColumnMenu;
