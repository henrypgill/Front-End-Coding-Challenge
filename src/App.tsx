import React from 'react';
import './App.css';
import OpviaAnalysis from './components/analysis/opviaAnalysis';
import OpviaNavbar from './components/header/OpviaNavbar';
import TableGroup from './components/table/TableGroup';

const App: React.FC = () => {
    return (
        <div className="App">
            <div>
                <OpviaNavbar />
            </div>
            <div style={{ padding: 0 }}>
                <OpviaAnalysis />
            </div>
            <div style={{ padding: 0 }}>
                <TableGroup />
            </div>
        </div>
    );
};

export default App;
