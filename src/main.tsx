import { createRoot } from 'react-dom/client';
import { HotkeysProvider } from '@blueprintjs/core';
import App from './App';
import 'normalize.css';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <HotkeysProvider>
        <Provider store={store}>
            <App />
        </Provider>
    </HotkeysProvider>,
);
