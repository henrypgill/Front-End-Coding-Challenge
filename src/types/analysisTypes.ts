

// define an interface for the state of the OpviaAnalysis Slice
export type AggregateType = 'maximum' | 'minimum';
export interface Aggregate {
    type: AggregateType;
    columnIndex: number;
    value: string | number;
    aggregateId: string;
}


// interface for updating an aggregates target column
export interface AggregateColumnUpdate {
    key: 'columnIndex';
    value: number;
}

// interface for updating an aggregates type
export interface AggregateTypeUpdate {
    key: 'type';
    value: AggregateType;
}

// Create a type for the payload of updating an aggregate
export type AggregateUpdate = AggregateColumnUpdate | AggregateTypeUpdate;
