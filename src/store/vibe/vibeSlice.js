import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants/apiConstant";

const VibeSlice = createSlice({
    name: "vibe",
    initialState: {
        loading: false,
        vibe: [],
        vibeDetail: {}
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setVibe: (state, action) => {
            state.vibe = action.payload;
        },
        setVibeDetail: (state, action) => {
            state.vibeDetail = action.payload;
        },
    },
});
export const { setLoading, setVibe, setVibeDetail } = VibeSlice.actions;

export const fetchVibe = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`${API_URL}/vibes?page=1`);
        dispatch(setVibe(response.data.member));
    } catch (error) {
        console.error(`Error fetching vibe: ${error}`);
    } finally {
        dispatch(setLoading(false));
    }
}

export default VibeSlice.reducer;