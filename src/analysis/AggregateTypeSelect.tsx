import { Button, MenuItem } from '@blueprintjs/core';
import { ItemRenderer, Select } from '@blueprintjs/select';
import { AggregateType } from '../redux/analysisSlice';

interface AggregateTypeSelectProps {
    currentType: AggregateType;
    onItemSelect: (
        item: AggregateType,
        event?: React.SyntheticEvent<HTMLElement, Event> | undefined,
    ) => void;
}

const AggregateTypeSelect: React.FC<AggregateTypeSelectProps> = ({
    currentType,
    onItemSelect,
}) => {
    const aggregateTypes: AggregateType[] = ['maximum', 'minimum'];

    const selectItemRenderer: ItemRenderer<AggregateType> = (
        type,
        { handleClick, handleFocus, modifiers, query },
    ) => {
        return (
            <MenuItem
                active={modifiers.active}
                disabled={modifiers.disabled}
                label={type}
                onClick={handleClick}
                onFocus={handleFocus}
                roleStructure="listoption"
                text={type}
                key={type}
            />
        );
    };

    return (
        <Select<AggregateType>
            items={aggregateTypes}
            onItemSelect={(item) => onItemSelect(item)}
            itemRenderer={selectItemRenderer}
        >
            <Button text={currentType} />
        </Select>
    );
};

export default AggregateTypeSelect;
