/* 
Explored creating components for different types of columns,
however ran into issues getting this to play nicely with
blueprintJS and I preferred the approach of handling this
within the state
*/

// import * as React from 'react';

// import { Cell, Column, ColumnProps, Table2 } from '@blueprintjs/table';
// import { dummyTableData } from '../../data/dummyData';
// import { OpviaTableColumn } from '../../redux/opviaTableSlice';

// export interface OpviaColumnProps {
//     column: OpviaTableColumn;
// }

// const DataColumn: React.FC<OpviaColumnProps> = ({ column }) => {
//     const getSparseRefFromIndexes = (
//         rowIndex: number,
//         columnIndex: number,
//     ): string => `${columnIndex}-${rowIndex}`;

//     const cellRenderer = (rowIndex: number, columnIndex: number) => {
//         const sparsePosition = getSparseRefFromIndexes(rowIndex, columnIndex);
//         const value = dummyTableData[sparsePosition];
//         return <Cell>{String(value)}</Cell>;
//     };

//     return (
//         <Column
//             key={`${column.columnId}`}
//             cellRenderer={cellRenderer}
//             name={column.columnName}
//         />
//     );
// };

// export default DataColumn;
