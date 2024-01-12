import * as React from 'react';

import { Cell, Column, ColumnProps, Table2 } from '@blueprintjs/table';
import { dummyTableData } from '../data/dummyData';
import { OpviaTableColumn } from '../redux/opviaTableSlice';

export interface OpviaTableProps {
  columns: OpviaTableColumn[];
}

const OpviaTable: React.FC<OpviaTableProps> = ({
  columns,
}: OpviaTableProps) => {
  const getSparseRefFromIndexes = (
    rowIndex: number,
    columnIndex: number,
  ): string => `${columnIndex}-${rowIndex}`;

  const cellRenderer = (rowIndex: number, columnIndex: number) => {
    const sparsePosition = getSparseRefFromIndexes(rowIndex, columnIndex);
    const value = dummyTableData[sparsePosition];
    return <Cell>{String(value)}</Cell>;
  };

  const cols = columns.map((column) => (
    <Column
      key={`${column.columnId}`}
      cellRenderer={cellRenderer}
      name={column.columnName}
    />
  ));

  return (
    <Table2
      defaultRowHeight={35}
      numRows={95}
      enableFocusedCell={true}
      enableColumnReordering={true}
    >
      {cols}
    </Table2>
  );
};

export default OpviaTable;
