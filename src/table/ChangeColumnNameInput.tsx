import {
    ControlGroup,
    EntityTitle,
    H6,
    InputGroup
} from '@blueprintjs/core';
import * as React from 'react';

interface ChangeColumnNameInputProps {
    name: string;
    units: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    setUnits: React.Dispatch<React.SetStateAction<string>>;
}

const ChangeColumnNameInput: React.FC<ChangeColumnNameInputProps> = ({
    name,
    units,
    setName,
    setUnits,
}) => {
    return (
        <ControlGroup
            fill={false}
            vertical={false}
            style={{
                padding: 8,
                display: 'flex',
                flexDirection: 'row',
                columnGap: 8,
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: 4,
                }}
            >
                <EntityTitle title={'Name'} heading={H6} />

                <InputGroup
                    placeholder="Name"
                    value={name}
                    onValueChange={(val) => setName(val)}
                    fill={false}
                    style={{ width: 124 }}
                />
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: 4,
                }}
            >
                <EntityTitle title={'Units'} heading={H6} />

                <InputGroup
                    placeholder="Units"
                    value={units}
                    onValueChange={(val) => setUnits(val)}
                    fill={false}
                    style={{ width: 124 }}
                />
            </div>
        </ControlGroup>
    );
};

export default ChangeColumnNameInput;
