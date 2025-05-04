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
        addSettingData: (state, action) => {
            state.settingDatas.push(action.payload); // Ajouter le nouveau paramètre au tableau
        },
    },
});
export const { setLoading, setSettingDatas, setSettingDataDetail, updateSettingData, addSettingData } = settingDataSlice.actions;

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


/**
 * Action pour effectuer un POST et créer un nouveau paramètre de configuration
 * @param {number} deviceId - ID du device
 * @param {number} settingTypeId - ID du type de paramètre
 * @param {number} vibeId - ID de la vibe
 * @param {any} value - Valeur par défaut du paramètre
 */
export const postSettingData = (deviceId, settingTypeId, value, vibeId) => async (dispatch) => {
    if (!deviceId || !settingTypeId || !vibeId) {
        console.error("postSettingData: deviceId, settingTypeId ou vibeId manquant.");
        return;
    }

    try {
        dispatch(setLoading(true));
        console.log(`postSettingData: Envoi d'une requête POST pour deviceId=${deviceId}, settingTypeId=${settingTypeId}, vibeId=${vibeId}, value=${value}`);

        const newSettingData = {
            settingType: `/api/setting_types/${settingTypeId}`, // Convertir en IRI
            vibe: `/api/vibes/${vibeId}`, // Convertir en IRI
            device: `/api/devices/${deviceId}`, // Convertir en IRI
            data: `${value}`,
        };

        axios.defaults.headers.post["Content-Type"] = "application/ld+json";
        const response = await axios.post(`${SETTINGDATAS_URL}`, newSettingData);

        dispatch(addSettingData(response.data)); // Ajouter la donnée créée au store
    } catch (error) {
        console.error(`postSettingData: Erreur lors de la requête POST - ${error.message}`);
    } finally {
        dispatch(setLoading(false));
    }
};


export default settingDataSlice.reducer;