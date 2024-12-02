import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import * as Comlink from 'comlink';
import System, { SystemContext, useSystemComponent } from 'swagger-adjust';

import './index.scss';
import ApiDOMPlaygroundPlugin from './playground/plugin.js';
import reportWebVitals from './reportWebVitals.js';

// eslint-disable-next-line react/jsx-no-constructed-context-values
const system = new System({
  plugins: [ApiDOMPlaygroundPlugin],
  middleware: (sys) => (getDefaultMiddleware) => {
    const apiDOMWorker = new Worker(new URL('./playground/apidom.worker', import.meta.url), {
      type: 'module',
    });
    const apiDOMService = Comlink.wrap(apiDOMWorker);

    return getDefaultMiddleware({
      thunk: {
        extraArgument: { getSystem: sys.getSystem, apiDOMService },
      },
      serializableCheck: {
        // ignore these field paths in all actions
        ignoredActionPaths: ['payload'],
      },
    });
  },
});
const store = system.getStore();
const themeInstance = createTheme();

const App = () => {
  const Playground = useSystemComponent('Playground');

  return <Playground />;
};

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <SystemContext.Provider value={system.getSystem}>
      <CssBaseline />
      <Provider store={store}>
        <ThemeProvider theme={themeInstance}>
          <App />
        </ThemeProvider>
      </Provider>
    </SystemContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
