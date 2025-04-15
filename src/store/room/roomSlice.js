import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants/apiConstant";

const roomSlice = createSlice({
    name: "rooms",
    initialState: {
        loading: false,
        rooms: [],
        roomsDetail: {}
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setRooms: (state, action) => {
            state.rooms = action.payload;
        },
        setRoomsDetail: (state, action) => {
            state.roomsDetail = action.payload;
        },
    },
});
export const { setLoading, setRooms, setRoomsDetail } = roomSlice.actions;

export const fetchRooms = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`${API_URL}/rooms?page=1`);
        dispatch(setRooms(response.data.member));
    } catch (error) {
        console.error(`Error fetching rooms: ${error}`);
    } finally {
        dispatch(setLoading(false));
    }
}

export default roomSlice.reducer;