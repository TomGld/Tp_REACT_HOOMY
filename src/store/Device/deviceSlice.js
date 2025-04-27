import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ROOT, API_URL } from "../../constants/apiConstant";

const deviceSlice = createSlice({
    name: "devices",
    initialState: {
        loading: false,
        devices: [],
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setDevices: (state, action) => {
            state.devices = action.payload;
        }
    }
})

export const { setLoading, setDevices } = deviceSlice.actions;

//méthode qui récupère les info d'un profile
export const fetchDevices = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`${API_URL}/devices?page=1`);
        dispatch(setDevices(response.data.member));
    } catch (error) {
        console.log(`erreur lors du fetchDevices : ${error}`);
    } finally {
        dispatch(setLoading(false));
    }
}

export default deviceSlice.reducer;