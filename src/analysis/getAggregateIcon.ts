import { AggregateType } from '../redux/analysisSlice';

const getAggregateIcon = (aggregateType: AggregateType) => {
    switch (aggregateType) {
        case 'maximum':
            return 'add';
        case 'minimum':
            return 'minus';
    }
};

export default getAggregateIcon;
