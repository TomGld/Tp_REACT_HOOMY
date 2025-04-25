import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants/apiConstant";

const vibeSlice = createSlice({
    name: "vibe",
    initialState: {
        loading: false,
        vibe: [],
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setVibes: (state, action) => {
            state.vibe = action.payload;
        }
    },
});
export const { setLoading, setVibes } = vibeSlice.actions;

// Méthode pour récupérer les vibes
export const fetchVibe = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`${API_URL}/vibes?page=1`);
        dispatch(setVibes(response.data.member));
    } catch (error) {
        console.error(`Error fetching vibes: ${error}`);
    } finally {
        dispatch(setLoading(false));
    }
}

// Méthode pour récupérer vibe par id
export const fetchVibeById = (id) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`${API_URL}/vibes/${id}`);
        dispatch(setVibes([response.data]));
    } catch (error) {
        console.error(`Error fetching vibe by ID: ${error}`);
    } finally {
        dispatch(setLoading(false));
    }
}



export default vibeSlice.reducer;