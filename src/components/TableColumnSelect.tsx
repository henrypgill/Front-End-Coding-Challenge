import { Button, MenuItem } from '@blueprintjs/core';
import { ItemRenderer, Select } from '@blueprintjs/select';
import { useAppSelector } from '../redux/store';
import { OpviaTableColumn } from '../types/tableTypes';

interface TableColumnSelectProps {
    exclusionColumnIndexes: number[];
    selectedColumnIndex: number;
    onItemSelect: (
        item: OpviaTableColumn,
        event?: React.SyntheticEvent<HTMLElement, Event> | undefined,
    ) => void;
}

const TableColumnSelect: React.FC<TableColumnSelectProps> = ({
    exclusionColumnIndexes,
    selectedColumnIndex,
    onItemSelect,
}) => {
    const { columns } = useAppSelector((state) => state.table);
    const columnOptions = columns.filter(
        (col) => !exclusionColumnIndexes.includes(col.columnIndex),
    );

    const selectedColumn = columns.find(
        (col) => col.columnIndex === selectedColumnIndex,
    )!;

    const selectItemRenderer: ItemRenderer<OpviaTableColumn> = (
        column,
        { handleClick, handleFocus, modifiers, query },
    ) => {
        return (
            <MenuItem
                active={modifiers.active}
                disabled={modifiers.disabled}
                label={column.columnName}
                onClick={handleClick}
                onFocus={handleFocus}
                roleStructure="listoption"
                text={column.columnName}
                key={column.columnId}
            />
        );
    };

    return (
        <Select<OpviaTableColumn>
            items={columnOptions}
            onItemSelect={(item) => onItemSelect(item)}
            itemRenderer={selectItemRenderer}
            fill={true}
        >
            <Button text={selectedColumn.columnName} fill={true} />
        </Select>
    );
};

export default TableColumnSelect;
