import * as React from 'react';

import { Cell, Column, Table2 } from '@blueprintjs/table';
import { dummyTableData } from '../data/dummyData';
import { ButtonGroup, Button, AnchorButton } from '@blueprintjs/core';
import { useAppDispatch } from '../redux/store';
import { opviaTableActions } from '../redux/opviaTableSlice';

const TableButtons: React.FC = () => {

  const dispatch = useAppDispatch()
  const tableActions = opviaTableActions

  const addColumnHandler = () => {
    dispatch(tableActions.addColumn({
        columnName: 'Name', columnType: 'data', columnId: 'var_col_3'
      }))
  }

  const buttons = () => {
    return (
      <>
        <Button icon="add-column-right" rightIcon="caret-down" onClick={addColumnHandler}>
          Add Column
        </Button>
      </>
    );
  };

  return (
    <div>
      <ButtonGroup minimal={true} children={buttons()}></ButtonGroup>
    </div>
  );
};

export default TableButtons;
