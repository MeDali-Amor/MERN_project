import axios from "axios";
import {
    CURRENT_USER,
    FAIL_USER,
    FOLLOW_USER,
    GET_ONE_USER,
    GET_USERS,
    LOAD_USER,
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER,
    SEARCH_USERS,
    UNFOLLOW_USER,
    UPDATE_USER,
} from "../constantes/user";

export const register = (user, history) => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        let result = await axios.post("/api/user/register", user);
        dispatch({ type: REGISTER_USER, payload: result.data }); // result = {user, token, msg}
        history.push("/profile/user._id");
    } catch (error) {
        dispatch({ type: FAIL_USER, payload: error.response.data });
    }
};

export const login = (user, history) => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        let result = await axios.post("/api/user/login", user);
        dispatch({ type: LOGIN_USER, payload: result.data }); // result = {user, token, msg}
        history.push("/profile/user._id");
    } catch (error) {
        dispatch({ type: FAIL_USER, payload: error.response.data });
    }
};

export const current = () => async (dispatch) => {
    try {
        const config = {
            headers: { authorization: localStorage.getItem("token") },
        };
        let result = await axios.get("/api/user/current", config);
        dispatch({ type: CURRENT_USER, payload: result.data }); //{msg, user}
    } catch (error) {
        dispatch({ type: FAIL_USER, payload: error.response.data });
    }
};

export const getAllUsers = () => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        let result = await axios.get("/api/user/users");
        dispatch({ type: GET_USERS, payload: result.data });
    } catch (error) {
        dispatch({ type: FAIL_USER, payload: error.response.data });
    }
};

export const getOneUser = (id) => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        // id = id.toString();
        let result = await axios.get(`/api/user/profile/${id}`);
        dispatch({ type: GET_ONE_USER, payload: result.data });
    } catch (error) {
        dispatch({ type: FAIL_USER, payload: error.response.data });
    }
};

export const searchUsers =
    ({ searchInput }) =>
    async (dispatch) => {
        dispatch({ type: LOAD_USER });
        try {
            let result = await axios.put("/api/user/search_name", {
                searchInput,
            });
            dispatch({ type: SEARCH_USERS, payload: result.data });
        } catch (error) {
            dispatch({ type: FAIL_USER, payload: error.response.data });
        }
    };

export const followUser = (id) => async (dispatch) => {
    try {
        const config = {
            headers: { authorization: localStorage.getItem("token") },
        };
        let result = await axios.put(`/api/user/follow/${id}`, config);
        dispatch({ type: FOLLOW_USER, payload: result.data });
    } catch (error) {
        dispatch({ type: FAIL_USER, payload: error.response.data });
    }
};

export const unfollowUser = (id) => async (dispatch) => {
    try {
        const config = {
            headers: { authorization: localStorage.getItem("token") },
        };
        let result = await axios.put(`/api/user/unfollow/${id}`, config);
        dispatch({ type: UNFOLLOW_USER, payload: result.data });
    } catch (error) {
        dispatch({ type: FAIL_USER, payload: error.response.data });
    }
};
export const updateUser = (id) => async (dispatch) => {
    try {
        const config = {
            headers: { authorization: localStorage.getItem("token") },
        };
        let result = await axios.put(`/api/user/update/${id}`, config);
        dispatch(getOneUser(id));
        dispatch({ type: UPDATE_USER, payload: result.data });
    } catch (error) {
        dispatch({ type: FAIL_USER, payload: error.response.data });
    }
};

export const deleteUser = (id) => async (dispatch) => {
    try {
        const config = {
            headers: { authorization: localStorage.getItem("token") },
        };
        let result = await axios.delete(`/api/user/delete/${id}`, config);
        // dispatch(getOneUser(id));
        dispatch({ type: UPDATE_USER, payload: result.data });
    } catch (error) {
        dispatch({ type: FAIL_USER, payload: error.response.data });
    }
};

export const logout = () => {
    return { type: LOGOUT_USER };
};
