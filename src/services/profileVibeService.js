import axios from "axios";
import { VIBES_URL } from "../constants/apiConstant";



export const fetchVibeDetail = async (newLabel, vibeId) => {

    const dataVibe = {
        label: newLabel
    }

    try {
        // on doit ajouter la méthode patch a axios
        axios.defaults.headers.patch["Content-Type"] = "application/merge-patch+json";
        const response = await axios.patch(`${VIBES_URL}/${vibeId}`, dataVibe);
        if (response.status === 200) {
        } else {
            console.log('erreur lors du fetchVibeDetail');
        }
    } catch (error) {
        console.log(`erreur lors du fetchVibeDetail : ${error}`);
    }
}