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
import statusReduser from './statusReduser.js';
import ordersReduser from './ordersReduser.js';

  const authPersistConfig = {
    key: 'hash_key',
    storage,
    whiteList: ['hash_key'],
  };
  
  const authPersistReducer = persistReducer(authPersistConfig, authReduser);

  export const store = configureStore({
    reducer: {
      // auth: authPersistReducer,
      auth: authReduser,
      addStatus: statusReduser,
      ordersAll: ordersReduser,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, REGISTER, PAUSE, PERSIST, PURGE],
        },
      }),
  });
  
  export const persistor = persistStore(store);
