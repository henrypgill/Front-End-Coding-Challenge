import { TableData } from '../types/tableTypes';

export function mapData(dataSet: { [key: string]: string | number }) {
    const mappedData: TableData = {};

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
