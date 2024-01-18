import { Button, EntityTitle } from '@blueprintjs/core';
import { ColumnHeaderCell2 } from '@blueprintjs/table';
import { OpviaTableColumn } from '../types/tableTypes';
import ColumnSettingsMenu from './ColumnSettingsMenu';

const getHeaderCellRenderer = (
    columns: OpviaTableColumn[],
    openColumnMenuIndex: number | undefined,
    setOpenColumnMenuIndex: React.Dispatch<
        React.SetStateAction<number | undefined>
    >,
) => {
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
        const isOpen = openColumnMenuIndex === column.columnIndex;
        const menuRenderer = () => {
            return (
                <ColumnSettingsMenu
                    column={column}
                    setOpenColumnMenuIndex={setOpenColumnMenuIndex}
                />
            );
        };

        return (
            <ColumnHeaderCell2
                nameRenderer={() => columnNameRenderer(column)}
                menuIcon={
                    <Button
                        icon="cog"
                        minimal={true}
                        intent="primary"
                        onClick={() =>
                            setOpenColumnMenuIndex(column.columnIndex)
                        }
                    />
                }
                menuRenderer={menuRenderer}
                menuPopoverProps={{
                    isOpen: isOpen,
                    onInteraction: (nextOpenState, e) => {
                        if (e && e!.target instanceof HTMLElement) {
                            if (!e.target.className.includes('bp5')) {
                                nextOpenState
                                    ? setOpenColumnMenuIndex(column.columnIndex)
                                    : setOpenColumnMenuIndex(undefined);
                            }
                        }
                    },
                }}
            />
        );
    };
    return headerCellRenderer;
};

export default getHeaderCellRenderer;
