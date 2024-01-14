import { HotkeysProvider } from '@blueprintjs/core';
import 'normalize.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import store from './redux/store';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <HotkeysProvider>
        <Provider store={store}>
            <App />
        </Provider>
    </HotkeysProvider>,
);
