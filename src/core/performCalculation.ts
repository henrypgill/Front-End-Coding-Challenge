import { ColumnFunctionOperator, TableColumnData } from '../types/tableTypes';

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

export const calculateFunctionColumnData = (
    col1Data: TableColumnData,
    col2Data: TableColumnData,
    operator: ColumnFunctionOperator,
) => {
    const calculatedColumnData: TableColumnData = {};
    for (let rowIndex in col1Data) {
        const num1 = parseFloat(col1Data[rowIndex]);
        const num2 = parseFloat(col2Data[rowIndex]);
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
