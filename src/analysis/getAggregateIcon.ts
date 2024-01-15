import { AggregateType } from '../redux/analysisSlice';

const getAggregateIcon = (aggregateType: AggregateType) => {
    switch (aggregateType) {
        case 'maximum':
            return 'arrow-top-right';
        case 'minimum':
            return 'arrow-bottom-left';
    }
};

export default getAggregateIcon;
