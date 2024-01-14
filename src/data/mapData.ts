import { TableData } from '../redux/tableSlice';

export function mapData(dataSet: { [key: string]: string | number }) {
    const mappedData: TableData = {};

    const getSparsePosition = (sparsePosition: string) => {};

    for (let itemKey in dataSet) {
        const [column, row] = itemKey.split('-');
        if (!mappedData[column]) {
            mappedData[column] = {};
        }
        Object.defineProperty(mappedData[column], row, {
            value: dataSet[itemKey],
            enumerable: true,
            writable: true,
            configurable: true,
        });
    }

    return mappedData;
}

// keeping old functions from OpviaTable for reference
// const getSparseRefFromIndexes = (
//     rowIndex: number,
//     columnIndex: number,
// ): string => `${columnIndex}-${rowIndex}`;

// const dataCellRenderer: CellRenderer = (rowIndex: number, columnIndex: number) => {
//     const sparsePosition = getSparseRefFromIndexes(rowIndex, columnIndex);
//     const value = dummyTableData[sparsePosition];
//     return <Cell>{String(value)}</Cell>;
// };
