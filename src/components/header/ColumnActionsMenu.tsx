import {
    Button,
    Card,
    Menu,
    MenuDivider,
    MenuItem,
    Popover,
} from '@blueprintjs/core';
import { useAppDispatch } from '../../redux/store';
import { opviaTableActions } from '../../redux/opviaTableSlice';
import * as React from 'react';
import CreateFxColumnDialog from './CreateFxColumnDialog';

const AddFxColumn: React.FC = () => {
    const dispatch = useAppDispatch();
    const tableActions = opviaTableActions;

    const addFxColumnHandler = () => {
        dispatch(
            tableActions.addColumn({
                columnName: 'Name',
                columnType: 'data',
                columnId: 'var_col_3',
            }),
        );
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
