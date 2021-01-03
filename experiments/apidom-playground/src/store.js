import { configureStore } from '@reduxjs/toolkit';
import rootReducer from 'features/app/slice';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
