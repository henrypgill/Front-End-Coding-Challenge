import { CellRenderer, Cell } from '@blueprintjs/table';
import { OpviaTableColumn, TableData } from '../types/tableTypes';

const getCellRenderer = (column: OpviaTableColumn, data: TableData) => {
    const emptyCellRenderer: CellRenderer = (
        rowIndex: number,
        columnIndex: number,
    ) => {
        return <Cell>{''}</Cell>;
    };

    const dataCellRenderer: CellRenderer = (
        rowIndex: number,
        columnIndex: number,
    ) => {
        const value = parseFloat(data[columnIndex][rowIndex]).toFixed(2);
        return <Cell>{String(value)}</Cell>;
    };

    const stringCellRenderer: CellRenderer = (
        rowIndex: number,
        columnIndex: number,
    ) => {
        const value = data[columnIndex][rowIndex];
        return <Cell>{String(value)}</Cell>;
    };

    const timeCellRenderer = (rowIndex: number, columnIndex: number) => {
        const dateTime = new Date(data[columnIndex][rowIndex]);

        return <Cell>{String(dateTime.toLocaleString('en-GB'))}</Cell>;
    };

    switch (column.columnType) {
        case 'function':
            return dataCellRenderer;
        case 'number':
            return dataCellRenderer;
        case 'string':
            return stringCellRenderer;
        case 'time':
            return timeCellRenderer;
        default:
            return emptyCellRenderer;
    }
};

export default getCellRenderer;
