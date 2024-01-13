import { Classes } from '@blueprintjs/core';
import React from 'react';
import './App.css';
import OpviaTable from './components/table/OpviaTable';
import TableGroup from './components/table/TableGroup';
import OpviaNavbar from './components/header/OpviaNavbar';

const App: React.FC = () => {
    return (
        <div className="App">
            <div>
                <OpviaNavbar />
            </div>
            <div style={{ padding: 0 }}>
                <TableGroup />
            </div>
        </div>
    );
};

export default App;
