import AsyncStorage from '@react-native-community/async-storage';
import {combineReducers} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';
import languageReducer from './slices/language';
import userAuthDetailsReducer from './slices/userAuthDetails';
import moviesListApiReducer from './slices/moviesListApi';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['language', 'userAuthDetails'],
};

const rootReducer = combineReducers({
  language: languageReducer,
  userAuthDetails: userAuthDetailsReducer,
  moviesListApi: moviesListApiReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
