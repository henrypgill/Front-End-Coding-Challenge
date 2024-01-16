// define an interface for the state of the OpviaAnalysis Slice
export type AggregateType = 'maximum' | 'minimum';
export interface Aggregate {
    type: AggregateType;
    columnIndex: number;
    value: string | number;
    aggregateId: string;
}
