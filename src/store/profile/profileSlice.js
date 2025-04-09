import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ROOT, API_URL } from "../../constants/apiConstant";

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
        },
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
        console.log(`erreur lors du fetchUserDetail : ${error}`);
    } finally {
        dispatch(setLoading(false));
    }
}

//méthode qui récupère tous les profiles avec leurs avatars
export const fetchAllProfile = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`${API_URL}/profiles`);
        const profiles = response.data.member;

        // Récupérer imagePath pour chaque profil
        const profilesWithImages = await Promise.all(
            profiles.map(async (profile) => {
                try {
                    const imageResponse = await axios.get(`${API_ROOT}${profile.image}`);
                    return { ...profile, imagePath: imageResponse.data.imagePath };
                } catch (error) {
                    console.log(`Erreur lors de la récupération de l'image pour le profil ${profile.id}: ${error}`);
                    return { ...profile, imagePath: null }; // En cas d'erreur, on met une valeur par défaut
                }f
            })
        );

        dispatch(setProfileDetail(profilesWithImages));
    } catch (error) {
        console.log(`Erreur lors du fetchAllUsers : ${error}`);
    } finally {
        dispatch(setLoading(false));
    }
}




export default profileSlice.reducer;