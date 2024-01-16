import { Divider, EntityTitle, Menu } from "@blueprintjs/core";
import { ColumnHeaderCell2 } from "@blueprintjs/table";
import { ColumnType, OpviaTableColumn } from "../types/tableTypes";
import ChangeColumnFunctionInput from "./ChangeColumnFunctionInput";
import ChangeColumnNameInput from "./ChangeColumnNameInput";

const getHeaderCellRenderer = (columnType: ColumnType, columns: OpviaTableColumn[]) => {


    const columnNameRenderer = (column: OpviaTableColumn) => {
        return (
            <EntityTitle
                title={column.columnName}
                subtitle={column.columnUnits}
            />
        );
    };

    const headerCellRenderer = (colIndex: number) => {
        const column = columns.find((col) => col.columnIndex === colIndex)!;

        const menuRenderer = () => {
            return (
                <Menu style={{ padding: 8 }}>
                    <div>
                        <strong>Settings</strong>
                    </div>
                    <Divider />
                    <ChangeColumnNameInput column={column} />
                    {columnType === 'function' && (
                        <>
                            <div>
                                <strong>Equation</strong>
                            </div>
                            <Divider />
                            <ChangeColumnFunctionInput column={column} />
                        </>
                    )}
                </Menu>
            );
        };

        return (
            <ColumnHeaderCell2
                nameRenderer={() => columnNameRenderer(column)}
                menuIcon={'menu'}
                menuRenderer={menuRenderer}
            ></ColumnHeaderCell2>
        );
    };
    return headerCellRenderer;
};


export default getHeaderCellRenderer