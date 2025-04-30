import { createSlice } from "@reduxjs/toolkit";
import { SETTINGDATAS_URL } from "../../constants/apiConstant";
import axios from "axios";

const settingDataSlice = createSlice({
    name: "settingdata",
    initialState: {
        loading: false,
        settingDatas: [],
        settingDataDetail: {},
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setSettingDatas: (state, action) => {
            state.settingDatas = action.payload;
        },
        setSettingDataDetail: (state, action) => {
            state.settingDataDetail = action.payload;
        },
        updateSettingData: (state, action) => {
            const { id, data } = action.payload;
            const settingData = state.settingDatas.find((item) => item.id === id);
            if (settingData) {
                settingData.data = data;
            }
        },
    },
});
export const { setLoading, setSettingDatas, setSettingDataDetail, updateSettingData } = settingDataSlice.actions;

/**
 * Récupération des détails d'une vibe
 * @param {number} id - ID de la vibe
 * @returns 
 */
export const fetchSettingDataDetail = (dataId) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`${SETTINGDATAS_URL}/${dataId}`);
        dispatch(setSettingDataDetail(response.data));
    } catch (error) {
        console.error(`Error fetching vibe detail: ${error}`);
    } finally {
        dispatch(setLoading(false));
    }
}


// Action pour mettre à jour le champ data côté serveur
export const patchSettingData = (id, data) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        axios.defaults.headers.patch["Content-Type"] = "application/merge-patch+json";
        // Convertir `data` en chaîne de caractères
        await axios.patch(`${SETTINGDATAS_URL}/${id}`, { data: String(data) });
        dispatch(updateSettingData({ id, data }));
    } catch (error) {
        console.error(`Error updating settingData: ${error}`);
    } finally {
        dispatch(setLoading(false));
    }
};


export default settingDataSlice.reducer;