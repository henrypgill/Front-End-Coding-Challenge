import * as React from 'react';

import OpviaTable from './OpviaTable';
import TableButtons from './TableButtons';
import { useAppSelector } from '../redux/store';

const TableGroup = () => {
  const { data, columns } = useAppSelector((state) => state.opviaTable);

  return (
    <>
      <TableButtons />
      <OpviaTable columns={columns} />
    </>
  );
};

export default TableGroup;
