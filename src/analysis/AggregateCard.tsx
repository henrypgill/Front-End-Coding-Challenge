import {
    Button,
    Card,
    Divider,
    Icon,
    Popover
} from '@blueprintjs/core';
import React from 'react';
import getAggregateIcon from '../core/getAggregateIcon';
import { Aggregate } from '../types/analysisTypes';
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
        minWidth: 240,
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
                placement="bottom-start"
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
