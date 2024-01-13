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

const AnalyseActionsMenu: React.FC = () => {
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
      <MenuItem icon="add" onClick={() => null} text="Maximum" />
      <MenuItem icon="minus" onClick={() => null} text="Minimum" />
    </Menu>
  );

  return (
    <Popover content={columnMenu} fill={true} placement="bottom">
      <Button
        alignText="left"
        fill={true}
        icon="chart"
        rightIcon="caret-down"
        text="Analysis"
      />
    </Popover>
  );
};

export default AnalyseActionsMenu;
