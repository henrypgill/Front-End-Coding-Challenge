import { ColumnFunctionOperator } from '../redux/opviaTableSlice';

export function performCalculation(
    num1: number,
    num2: number,
    operator: ColumnFunctionOperator,
): number {
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
}
