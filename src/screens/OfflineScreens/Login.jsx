import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProfile } from "../../store/profile/profileSlice";
import selectUserData from "../../store/profile/profileSelector";
import ProfileList from "../../components/Profile/profileList";


const Login = () => {
  const dispatch = useDispatch();
  const { loading, profileDetail } = useSelector(selectUserData);

  // Récupérer les profils lors du chargement de la page
  useEffect(() => {
    dispatch(fetchAllProfile());
  }, [dispatch]);

  return (
    <div>
      <h1>Interface de connexion Hoomy</h1>
      {loading ? (
        <p>Chargement des profils...</p>
      ) : (
          <ProfileList profileDetail={profileDetail} />
      )}
    </div>
  );
};

export default Login;