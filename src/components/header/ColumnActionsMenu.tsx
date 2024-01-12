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


const ColumnActionsMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const tableActions = opviaTableActions;

  const addFunctionColumnHandler = () => {
    dispatch(
      tableActions.addColumn({
        columnName: 'Name',
        columnType: 'data',
        columnId: 'var_col_3',
      }),
    );
  };

  const columnMenu = (
    <Menu>
      <MenuItem
        icon="derive-column"
        onClick={addFunctionColumnHandler}
        text="Function Column"
      />
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
