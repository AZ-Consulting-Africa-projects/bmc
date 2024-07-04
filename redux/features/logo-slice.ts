import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

type InitialState = {
    value: LogoState
}
type LogoState = {
    
    url: string,
}

const initialState = {
    value: {
        url: "",
    } as LogoState
} as  InitialState

const persistConfig = {
    key: 'root',
    storage,
};

export const logo = createSlice({
    name: "logo",
    initialState,
    reducers: {
        logoIni: () => {
            return initialState;
        },

        setLogo: (state, action: PayloadAction<LogoState>) => {
            return {
                value: {
                    
                    url: action.payload.url
                }
            }
        }
    }
})


// Wrapping the reducer with persistReducer
const logoReducer = persistReducer(persistConfig, logo.reducer);

export const { setLogo, logoIni } = logo.actions
export default logoReducer;