import * as React from 'react';

import { Column, Table2 } from '@blueprintjs/table';
import { useAppSelector } from '../redux/store';
import getCellRenderer from './getCellRenderer';
import getHeaderCellRenderer from './getHeaderCellRenderer';

const OpviaTable: React.FC = () => {
    const { data, columns } = useAppSelector((state) => state.table);
    const [openColumnMenuIndex, setOpenColumnMenuIndex] = React.useState<
        number | undefined
    >(undefined);

    const cols = columns.map((column) => {
        return (
            <Column
                key={`${column.columnId}`}
                cellRenderer={getCellRenderer(column, data)}
                columnHeaderCellRenderer={getHeaderCellRenderer(
                    columns,
                    openColumnMenuIndex,
                    setOpenColumnMenuIndex,
                )}
                name={column.columnName}
            />
        );
    });

    return (
        <Table2
            defaultRowHeight={35}
            numRows={95}
            enableFocusedCell={true}
            cellRendererDependencies={[data, columns]}
        >
            {cols}
        </Table2>
    );
};

export default OpviaTable;
