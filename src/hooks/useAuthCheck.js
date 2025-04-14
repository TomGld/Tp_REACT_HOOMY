import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { checkProfile } from "../services/proflieSevice";

const useAuthCheck = (profileInfos) => {
    const navigate = useNavigate();
    const { signOut } = useAuthContext();

    const verifyProfile = async () => {
        if(profileInfos && profileInfos.profileId){
            const isValidProfile = await checkProfile(profileInfos);
            // Si l'utilisateur n'est pas valide, on le deconnecte et on le redirige vers la page login
            if(!isValidProfile){
                signOut();
                navigate('/', {replace: true});
            }
        }else{
            navigate('/', {replace: true})
        }
    }

    useEffect(() => {
      verifyProfile();
    }, [profileInfos, navigate])
};

export default useAuthCheck;