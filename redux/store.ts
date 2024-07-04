import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './features/auth-slice';
import configReducer from './features/config-slice';
import logoReducer from './features/logo-slice';

// Combine reducers
const rootReducer = combineReducers({
    auth: authReducer,
    config: configReducer,
    logo: logoReducer
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer
});

// Créer le persisteur Redux
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
