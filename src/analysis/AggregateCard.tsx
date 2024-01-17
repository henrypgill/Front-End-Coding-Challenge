import {
    Button,
    Card,
    ControlGroup,
    Divider,
    EntityTitle,
    H4,
    H6,
    Icon,
    Menu,
    Popover,
} from '@blueprintjs/core';
import React from 'react';
import TableColumnSelect from '../components/TableColumnSelect';
import getAggregateIcon from '../core/getAggregateIcon';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { tableActions } from '../redux/tableSlice';
import { Aggregate, AggregateType } from '../types/analysisTypes';
import AggregateTypeSelect from './AggregateTypeSelect';
import AggregateCardMenu from './AggregateCardMenu';
interface AggregateCardProps {
    aggregate: Aggregate;
}
const AggregateCard: React.FC<AggregateCardProps> = ({ aggregate }) => {
    const [menuIsOpen, setMenuIsOpen] = React.useState(false);

    const cardStyle: React.CSSProperties = {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 8,
        height: 60,
        width: 240,
    };
    let value: string;
    if (typeof aggregate.value === 'number') {
        value = aggregate.value.toFixed(2);
    } else {
        value = aggregate.value;
    }
    return (
        <Card compact={true} style={cardStyle}>
            <Popover
                content={
                    <AggregateCardMenu
                        aggregate={aggregate}
                        setMenuIsOpen={setMenuIsOpen}
                    />
                }
                isOpen={menuIsOpen}
                placement="right"
            >
                <Button
                    icon="cog"
                    minimal={true}
                    intent="primary"
                    onClick={() => setMenuIsOpen(!menuIsOpen)}
                />
            </Popover>
            <Divider style={{ height: '100%' }} />
            <Icon icon={getAggregateIcon(aggregate.type)} size={20} />
            <h4>{`${aggregate.type}:`.toLowerCase()}</h4>
            <h4>{value}</h4>
        </Card>
    );
};

export default AggregateCard;
