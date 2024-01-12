import * as React from 'react';

import OpviaTable from "./OpviaTable"
import TableButtons from "./TableButtons"

const defaultColumns = [
    { columnName: 'Time', columnType: 'time', columnId: 'time_col' },
    {
      columnName: 'Cell Density (Cell Count/Litre)',
      columnType: 'data',
      columnId: 'var_col_1',
    },
    { columnName: 'Volume (Litres)', columnType: 'data', columnId: 'var_col_2' },
  ];
const TableGroup = () => {

    const [columns, setColumns] = React.useState(defaultColumns)

    return (
        <>
        <TableButtons />
        <OpviaTable columns={columns}/>
        </>
    )

}

export default TableGroup