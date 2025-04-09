import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants/apiConstant";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        loading: false,
        profileDetail: [],
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setProfileDetail: (state, action) => {
            state.profileDetail = action.payload;
        }
    }
})

export const { setLoading, setProfileDetail } = profileSlice.actions;

//méthode qui récupère les info d'un profile
export const fetchProfileDetail = (id) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`${API_URL}/profiles/${id}`);
        dispatch(setProfileDetail(response.data));
    } catch (error) {
        console.log(`erreur lors du fetchProfileDetail : ${error}`);
    } finally {
        dispatch(setLoading(false));
    }
}

//méthode qui récupère tous les profiles avec leurs avatars
export const fetchAllProfile = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`${API_URL}/profiles`);
        dispatch(setProfileDetail(response.data.member));
    } catch (error) {
        console.log(`erreur lors du fetchAllProfiles : ${error}`);
    } finally {
        dispatch(setLoading(false));
    }
}


export default profileSlice.reducer;