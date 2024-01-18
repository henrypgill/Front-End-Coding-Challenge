import { MenuItem, Button } from '@blueprintjs/core';
import { ItemRenderer, Select } from '@blueprintjs/select';
import { ColumnFunctionOperator } from '../types/tableTypes';
import { getFunctionOperators } from '../core/getFunctionOperators';

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
    const operators = getFunctionOperators();

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
            fill={true}
        >
            <Button text={selectedOperator} fill={true} />
        </Select>
    );
};

export default TableOperatorSelect;
