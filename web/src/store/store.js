import { configureStore, createSlice } from '@reduxjs/toolkit'


const getInitialAuthState = () => {

    try {

        const user = JSON.parse(localStorage.getItem("user"));

        if (user && user.isUserLoggedIn) {

            return {
                isUserLoggedIn: true,
                loggedInUser: Number(user.loggedInUser),
            };
        } else {
            return {
                isUserLoggedIn: false,
                loggedInUser: null,
            };
        }
    } catch (e) {
        console.error("Error parsing user from localStorage", err);
    }
    return {
        isUserLoggedIn: false,
        loggedInUser: null,
    };
}
const authSlice = createSlice({
    name: "auth",
    initialState: getInitialAuthState(),
    reducers: {
        login: (state, action) => {
          localStorage.setItem("user", JSON.stringify({
            isUserLoggedIn: true,
            loggedInUser: action.payload.roleId
          }))
            state.isUserLoggedIn = true;
            state.loggedInUser = action.payload.roleId
        },
        logout: (state) => {

            localStorage.removeItem("user");
            state.isUserLoggedIn = false;
            state.loggedInUser = null
        },
    },
});

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    }
});

export const { login, logout } = authSlice.actions;

export default store;