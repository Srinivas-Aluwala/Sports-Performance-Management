import {configureStore, createSlice} from '@reduxjs/toolkit'


  const user = JSON.parse(localStorage.getItem("user"));

console.log(user);

const authSlice = createSlice({
    name : "auth",
    initialState : user 
    ? {
        isUserLoggedIn : true,
        loggedInUser : Number(user.loggedInUser),
    }
    : {
        isUserLoggedIn : false,
        loggedInUser : null,
    },
    reducers : {
        login : (state, action) => {
            console.log(action);
            
            state.isUserLoggedIn = true;
            state.loggedInUser = action.payload.roleId
        },
        logout : (state) => {

            state.isUserLoggedIn = false;
            state.loggedInUser = null
        },
    },
});

const store = configureStore({
    reducer : {
        auth : authSlice.reducer,
    }
});

export const {login, logout} = authSlice.actions;

export default store;