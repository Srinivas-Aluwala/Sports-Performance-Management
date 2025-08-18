import { QueryClient } from "@tanstack/react-query";
import api from "../util/axiosInstance";


export const queryClient = new QueryClient();


export const signUpRequest = async (formData) => {

    try {
        const { data, status: statusCode } = await api.post("/register", formData);

        if (statusCode === 200 && data) {

            return data;
        }

        return
    } catch (e) {
        throw e;
    }
}


export const fetchUserNames = async () => {


    try {
        const { data, status: statusCode } = await api.get("/fetchUsernames");

            
        if (statusCode === 401) {

            const refreshData = await refreshToken();

            if (refreshData.ok) {
                return await logoutRequest();
            }
        }

        if (statusCode === 200 && data) {

            return data;
        }

        return
    } catch (e) {
        throw e;
    }
}


export const loginRequest = async ({ username, password }) => {


    try {

        const { data, status: statusCode } = await api.post('/login', { username, password });

        if (statusCode === 200 && data) {

            return data;
        }

        return
    } catch (e) {
        throw e;
    }
}

export const refreshToken = async () => {
    try {
        const { data, status: statusCode } = await api.post("/refreshToken",{});

        if (statusCode === 200 && data) {
            return data;
        }
        return;

    } catch (e) {
        throw e;
    }
}


export const logoutRequest = async () => {
    try {
        const { data, status: statusCode } = await api.post("/logout",{});

        if (statusCode === 200 && data) {            
            return data;
        }

        return;

    } catch (e) {
        throw e;vV
    }
}





// function* handleLogInRequest(action) {
//     console.log("in login request");
//     const { logInUser } = action.payload;
//     let apiResult;
//     let data;
//     const { username, password } = logInUser;
//     try {
//         apiResult = yield call(axios.post, "/api/login", {
//             username,
//             password,
//         });
//     } catch (e) {
//         yield call(handleError, e);
//         return;
//     }
//     data = yield apiResult.data;
//     if (apiResult.status === 200 ) {
//         if(data.status.status){

//         yield put(auth.success(data.user));
//         const obj = {
//             isAuthenticated: true,
//             loggedInUser: data.user,
//             selectedSurveyId: undefined,
//             selectedStateId: undefined,
//         };
//         yield call(persistToStorage, obj);
//         const route = yield call(getRoute, data.user.roleId);
//         yield call(window.navigate, route);
//     }
//     }else {
//         yield put(auth.failure(data.status.message));
//     }
// }

// function* handleLogOutRequest() {
//     let apiResult;
//     try {
//         apiResult = yield call(axios.get, "/api/logout");
//     } catch (e) {
//         yield call(handleError, e);
//         yield call(clearAuth);
//         const route = yield call(getRoute);
//         yield call(window.navigate, route);
//         return;
//     }
//     if (apiResult.status === 200) {
//         yield put(auth.success({}));
//         yield call(clearAuth);
//         const route = yield call(getRoute);
//         yield call(window.navigate, route);
//         toast.success(`${apiResult.data.statusMessage}!`);
//     }
// }

function* handleError(e) {
    const data = e.response?.data;
    if (data && data.apierror) {
        yield put(auth.failure({ error: data.apierror.message }));
        if (e.response.status === 401) {
            toast.error(data.apierror.message);
        }
    } else {
        yield put(auth.failure({ error: e.message }));
        toast.error(e.message);
    }
}