import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SignInResponse } from '@/types/auth.types';
import { User } from '@/types/shared.types';

interface AuthState {
    accessToken: SignInResponse['accessToken'] | null;
    refreshToken: SignInResponse['refreshToken'] | null;
    isAuthenticated: boolean;
    user: User | null;
}

const initialState: AuthState = {
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<SignInResponse>) => {
            state.accessToken = action.payload.accessToken;
            state.accessToken = action.payload.refreshToken;
            state.isAuthenticated = true;
            state.user = { ...action.payload.user };
        },
        logout(state) {
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            state.user = null;
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;