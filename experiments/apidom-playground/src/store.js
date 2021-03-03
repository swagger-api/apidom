import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import * as Complink from 'comlink';
import rootReducer from 'features/app/slice';
import ApiDOMWorker from 'features/app/apidom.worker';

const createStore = () => {
  const apiDOMWorker = new ApiDOMWorker();
  const apiDOMService = Complink.wrap(apiDOMWorker);

  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
      thunk: {
        extraArgument: { apiDOMService },
      },
      serializableCheck: {
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload'],
      },
    }),
  });
};

export default createStore;
