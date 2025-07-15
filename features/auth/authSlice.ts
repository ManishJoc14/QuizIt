import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.accessToken = action.payload.token.accessToken;
            state.refreshToken = action.payload.token.refreshToken;
            state.isAuthenticated = true;
        },
        logout(state) {
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;