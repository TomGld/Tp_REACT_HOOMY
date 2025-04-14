import { createContext, useContext, useEffect, useState } from "react";
import { PROFILE_INFOS} from "../constants/appConstant";
import PageLoader from "../components/Loader/PageLoader";
import { RouterProvider } from "react-router-dom";
import OnlineRouter from "./OnlineRouter";
import OfflineRouter from "./OfflineRouter";
import { useAuthContext } from "../contexts/AuthContext";

// Création d'un mini context pour la session
const SessionContext = createContext({inSession: false});

// Hook pour l'utiliser le contexte de session 
export const useSessionContext = () => useContext(SessionContext);

const AppRouter = () => {
    // On crée un state pour gere la session 
    const [inSession, setInSession] = useState(null);
    // On récupère grace au hook les données de notre contexte d'authentification
    const { profileId, setProfileId, setName } = useAuthContext();
    // On récupère les données de l'utilisateur dans le localStorage
    const profileInfos = JSON.parse(localStorage.getItem(PROFILE_INFOS));
    console.log('profileInfo', profileInfos);
    

    useEffect(() => {
      const checkProfileSession = async () => {
        if(profileInfos){
            setProfileId(profileInfos.profileId);
            setName(profileInfos.name);
            setInSession(true);
        }else{
            setInSession(false);
        }
      }

      checkProfileSession();

    }, [profileId])
    
    // On affiche le loader le temps du chargement
    if(inSession === null){
        return <PageLoader />
    }

    return (
        <SessionContext.Provider value = {{inSession}}>
            <RouterProvider router={inSession ? OnlineRouter : OfflineRouter} />
        </SessionContext.Provider>
    )

}

export default AppRouter;