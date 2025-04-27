import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants/apiConstant";

const vibeSlice = createSlice({
    name: "vibe",
    initialState: {
        loading: false,
        vibes: [],
        vibeDetail: {}
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setVibes: (state, action) => {
            state.vibes = action.payload;
        },
        setVibeDetail: (state, action) => {
            state.vibeDetail = action.payload;
        },
    },
});
export const { setLoading, setVibes, setVibeDetail } = vibeSlice.actions;

/**
 * Récupération de toutes les vibes
 * @param {function} dispatch - Fonction de dispatch
 * @returns 
 */
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

/**
 * Récupération des détails d'une vibe
 * @param {number} id - ID de la vibe
 * @returns 
 */
export const fetchVibeDetail = (id) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`${API_URL}/vibes/${id}`);
        dispatch(setVibeDetail(response.data));
    } catch (error) {
        console.error(`Error fetching vibe detail: ${error}`);
    } finally {
        dispatch(setLoading(false));
    }
}

export default vibeSlice.reducer;