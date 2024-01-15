import { MenuItem, Button } from '@blueprintjs/core';
import { ItemRenderer, Select } from '@blueprintjs/select';
import { ColumnFunctionOperator } from '../redux/tableSlice';

interface TableOperatorSelectProps {
    selectedOperator: ColumnFunctionOperator;
    onItemSelect: (
        item: ColumnFunctionOperator,
        event?: React.SyntheticEvent<HTMLElement, Event> | undefined,
    ) => void;
}

const TableOperatorSelect: React.FC<TableOperatorSelectProps> = ({
    selectedOperator,
    onItemSelect,
}) => {
    const operators: ColumnFunctionOperator[] = ['*', '/', '+', '-'];

    const selectItemRenderer: ItemRenderer<ColumnFunctionOperator> = (
        operator,
        { handleClick, handleFocus, modifiers, query },
    ) => {
        return (
            <MenuItem
                active={modifiers.active}
                disabled={modifiers.disabled}
                label={operator}
                onClick={handleClick}
                onFocus={handleFocus}
                roleStructure="listoption"
                text={operator}
                key={operator}
            />
        );
    };

    return (
        <Select<ColumnFunctionOperator>
            items={operators}
            onItemSelect={(item) => onItemSelect(item)}
            itemRenderer={selectItemRenderer}
        >
            <Button text={selectedOperator} />
        </Select>
    );
};

export default TableOperatorSelect;
