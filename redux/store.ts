import {configureStore} from '@reduxjs/toolkit'
import authReducer from './features/auth-slice'
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Combine reducers
const rootReducer = combineReducers({
    auth: authReducer,
});

const persistConfig = {
    key: 'root',
    storage,
};


const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer : {
        authReducer,
    }
})
// Créer le persisteur Redux
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;