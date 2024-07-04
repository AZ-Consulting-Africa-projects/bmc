import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

type LogoState = {
    url: string;
};

const initialState: LogoState = {
    url: '',
};

const persistConfig = {
    key: 'logo',
    storage,
};

export const logoSlice = createSlice({
    name: 'logo',
    initialState,
    reducers: {
        logoIni: (state) => {
            state.url = initialState.url;
        },
        setLogo: (state, action: PayloadAction<string>) => {
            state.url = action.payload;
        },
    },
});

// Wrapping the reducer with persistReducer
const logoReducer = persistReducer(persistConfig, logoSlice.reducer);

export const { setLogo, logoIni } = logoSlice.actions;
export default logoReducer;
