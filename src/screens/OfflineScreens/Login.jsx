import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../store/profile/profileSlice";
import selectUserData from "../../store/profile/profileSelector";
import ProfileList from "../../components/Profile/profileList";


const Login = () => {
  const dispatch = useDispatch();
  const { loading, userDetail } = useSelector(selectUserData);

  // Récupérer les profils lors du chargement de la page
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div>
      <h1>Interface de connexion Hoomy</h1>
      {loading ? (
        <p>Chargement des profils...</p>
      ) : (
        <ProfileList profiles={userDetail} />
      )}
    </div>
  );
};

export default Login;