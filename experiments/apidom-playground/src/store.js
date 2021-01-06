import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from 'features/app/slice';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      // Ignore these field paths in all actions
      ignoredActionPaths: ['payload'],
    },
  }),
});

export default store;
