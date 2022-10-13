import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    REGISTER,
    PAUSE,
    PERSIST,
    PURGE,
  } from 'redux-persist';
  import storage from 'redux-persist/lib/storage';
  import authReduser from './authReduser.js';

  const authPersistConfig = {
    key: 'authToken',
    storage,
    whiteList: ['token'],
  };
  
  const authPersistReducer = persistReducer(authPersistConfig, authReduser);

  export const store = configureStore({
    reducer: {
      auth: authPersistReducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, REGISTER, PAUSE, PERSIST, PURGE],
        },
      }),
  });
  
//   export const persistor = persistStore(store);
