import React from 'react';
import './App.css';
import OpviaAnalysis from './analysis/opviaAnalysis';
import OpviaNavbar from './header/OpviaNavbar';
import OpviaTable from './table/OpviaTable';

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
                <OpviaTable />
            </div>
        </div>
    );
};

export default App;
