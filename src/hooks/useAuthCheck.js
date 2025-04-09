import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { checkProfile } from "../services/proflieSevice";

const useAuthCheck = (profileInfo) => {
    const navigate = useNavigate();
    const { signOut } = useAuthContext();

    const verifyProfile = async () => {
        if(profileInfo && profileInfo.profileId){
            const isValidProfile = await checkProfile(profileInfo);
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
    }, [profileInfo, navigate])
};

export default useAuthCheck;