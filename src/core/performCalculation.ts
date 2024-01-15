import { ColumnFunctionOperator, TableColumn } from '../redux/tableSlice';

export const performCalculation = (
    num1: number,
    num2: number,
    operator: ColumnFunctionOperator,
): number => {
    switch (operator) {
        case '*':
            return num1 * num2;
        case '/':
            return num1 / num2;
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
    }
};

export const calculateColumnData = (
    col1Data: TableColumn,
    col2Data: TableColumn,
    operator: ColumnFunctionOperator,
) => {
    const calculatedColumnData: TableColumn = {};
    for (let rowIndex in col1Data) {
        const num1 = parseInt(col1Data[rowIndex]);
        const num2 = parseInt(col2Data[rowIndex]);
        const result = performCalculation(num1, num2, operator);
        Object.defineProperty(calculatedColumnData, rowIndex, {
            value: String(result),
            enumerable: true,
            writable: true,
            configurable: true,
        });
    }
    return calculatedColumnData;
};
