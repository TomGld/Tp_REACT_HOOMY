import { createContext, useContext, useState } from "react";
import { PROFILE_INFOS } from "../constants/appConstant";

// On définit notre contexte d'authentification
const AuthContext = createContext({
    profileId: '', //state
    name: '', //state
    setProfileId: () => {}, //Méthode pour modifier le state ProfileId
    setName: () => {}, //Méthode pour modifier le state nickname
    signIn: async () => {}, //Méthode pour se connecter
    signOut: async () => {}, //Méthode pour se déconnecter
});

// on va définir toute la mécanique de notre contexte d'authentification
const AuthContextProvider = ({ children }) => {
    const [profileId, setProfileId] = useState('');
    const [name, setName] = useState('');

    // On définit notre méthode singIn pour la connexion
    const signIn = async (profile) => {
        try {
            // On remplit nos states avec les données de l'utilisateur
            setProfileId(profile.profileId);
            setName(profile.name);
            // On enregistre les données de l'utilisateur dans le localStorage
            localStorage.setItem(PROFILE_INFOS, JSON.stringify(profile));
        } catch (error) {
            throw new Error(`Erreur lors de la connexion : ${error}`);
        }
    }

    // On définit notre méthode signOut pour la déconnexion
    const signOut = async () => {
        try {
            // On remplit nos states avec les données de l'utilisateur
            setProfileId('');
            setName('');
            // On supprime les données de l'utilisateur dans le localStorage
            localStorage.removeItem('PROFILE_INFOS');
        } catch (error) {
            throw new Error(`Erreur lors de la déconnexion : ${error}`);
        }
    }

    // On définit les valeurs de notre contexte
    const value = {
        profileId,
        name,
        setProfileId,
        setName,
        signIn,
        signOut,
    }

    // On retourne notre contexte d'authentification
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Création d'un hook personnalisé pour utiliser le contexte d'authentification
const useAuthContext = () => useContext(AuthContext);

// On exporte notre contexte d'authentification
export { AuthContextProvider, useAuthContext, AuthContext };