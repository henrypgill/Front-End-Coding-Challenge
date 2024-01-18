import { ColumnFunctionOperator } from '../types/tableTypes';

export const getFunctionOperators: () => ColumnFunctionOperator[] = () => [
    '*',
    '/',
    '+',
    '-',
];
