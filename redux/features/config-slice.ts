import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

type InitialState = {
    value: ConfigState
}
type ConfigState = {
    isConfig: boolean,
}

const initialState = {
    value: {
        isConfig: false,
    } as ConfigState
} as  InitialState

const persistConfig = {
    key: 'root',
    storage,
};

export const config = createSlice({
    name: "config",
    initialState,
    reducers: {
        configOut: () => {
            return initialState;
        },

        configIn: () => {
            return {
                value: {
                    isConfig: true,
                }
            }
        }
    }
})


// Wrapping the reducer with persistReducer
const configReducer = persistReducer(persistConfig, config.reducer);

export const { configIn, configOut } = config.actions
export default configReducer;