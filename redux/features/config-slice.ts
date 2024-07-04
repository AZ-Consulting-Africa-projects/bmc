import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

type ConfigState = {
    isConfig: boolean;
};

const initialState: ConfigState = {
    isConfig: false,
};

const persistConfig = {
    key: 'config',
    storage,
};

export const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        configOut: (state) => {
            state.isConfig = false;
        },
        configIn: (state) => {
            state.isConfig = true;
        },
    },
});

// Wrapping the reducer with persistReducer
const configReducer = persistReducer(persistConfig, configSlice.reducer);

export const { configIn, configOut } = configSlice.actions;
export default configReducer;
