import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { USER_INFOS } from "../constants/appConstant";
import useSubscriptionCheck from "../hooks/useSubscriptionCheck";
import PageLoader from "../components/Loader/PageLoader";
import { RouterProvider } from "react-router-dom";
import OnlineRouter from "./OnlineRouter";
import OfflineRouter from "./OfflineRouter";

// Création d'un mini contexte pour la session
const SessionContext = createContext({ inSession: false });

// hook pour utiliser le contexte de session
export const useSessionContext = () => useContext(SessionContext);

const AppRouter = () => {
    // on crée un state pour gerer la session
    const [inSession, setInSession] = useState(null);
    // on récupère grace au hook les données de notre contexte d'authentification
    const { userId, setUserId, setName } = useAuthContext();
    // on récupère les données de l'utilisateur dans le localStorage
    const userInfo = JSON.parse(localStorage.getItem(USER_INFOS));

    useEffect(() => {
        const checkUserSession = async () => {
            if (userInfo) {
                setUserId(userInfo.userId);
                setName(userInfo.name);
                setInSession(true);
            } else {
                setInSession(false);
            }
        }

        checkUserSession();
    }, [userId])

    //on affiche le loader le temps du chargement
    if (inSession === null || loadingSubscription) {
        return <PageLoader />
    }

    return (
        <SessionContext.Provider value={{ inSession }}>
            <RouterProvider router={OfflineRouter} />
        </SessionContext.Provider>
    )

}

export default AppRouter;