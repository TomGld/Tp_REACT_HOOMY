import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants/apiConstant";

const userSlice = createSlice({
    name: "users",
    initialState: {
        loading: false,
        userDetail: {},
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUserDetail: (state, action) => {
            state.userDetail = action.payload;
        },
    }
})

export const { setLoading, setUserDetail } = userSlice.actions;

//méthode qui récupère les info d'un user
export const fetchUserDetail = (id) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`${API_URL}/profiles/${id}`);
        dispatch(setUserDetail(response.data));
    } catch (error) {
        console.log(`erreur lors du fetchUserDetail : ${error}`);
    } finally {
        dispatch(setLoading(false));
    }
}

//méthode qui récupère tous les profiles avec leurs avatars
export const fetchAllUsers = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`${API_URL}/profiles`);
        dispatch(setUserDetail(response.data));
    } catch (error) {
        console.log(`erreur lors du fetchAllUsers : ${error}`);
    } finally {
        dispatch(setLoading(false));
    }
}


export default userSlice.reducer;