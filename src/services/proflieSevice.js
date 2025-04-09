import axios from "axios";
import { API_URL } from "../constants/apiConstant";

/**
 * Méthode qui vérifie que l'utilisateur du local storage est bien celui de la bdd
 * @param [object] profileInfo - l'utilisateur du local storage
 * @return {boolean} -true si  l'utilisateur est bien celui de la bdd, false sinon
 */
export const checkProfile = async (profileInfo) => {
    try {
        // On récupère l'utilisateur dans le bdd avec l'id qui est en local storage
        const response = await axios.get(`${API_URL}/profiles/${profileInfo.profileId}`);
        const profile = response.data;
        // maintenant on va comparer les données de la bdd avec celle du local storage
        if (profile.name === profileInfo.name) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(`Erreur sur le checkProfile: ${error}`);
        return false;
    }
}