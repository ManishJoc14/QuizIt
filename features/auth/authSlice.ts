import { SignInResponse, User } from '@/types/auth.types';
import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
    accessToken: SignInResponse['token']['accessToken'] | null;
    refreshToken: SignInResponse['token']['refreshToken'] | null;
    isAuthenticated: boolean;
    user: User | null;
}

const initialState: AuthState = {
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    user: null,
};

type actionType = {
    payload: SignInResponse
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: actionType) => {
            state.accessToken = action.payload.token.accessToken;
            state.refreshToken = action.payload.token.refreshToken;
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