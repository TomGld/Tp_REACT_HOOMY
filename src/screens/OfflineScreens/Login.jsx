import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProfile } from "../../store/profile/profileSlice";
import ProfileList from "../../components/Profile/profileList";
import PageLoader from "../../components/Loader/PageLoader";
import selectProfileData from "../../store/profile/profileSelector";


const Login = () => {
  const dispatch = useDispatch();
  const { loading, profileDetail } = useSelector(selectProfileData);


  // Récupérer les profils lors du chargement de la page
  useEffect(() => {
    dispatch(fetchAllProfile());
  }, [dispatch]);




  return (
    <div>
      {loading ? <PageLoader/> : (
          <ProfileList profiles={profileDetail} />
      )}
    </div>
  );
};

export default Login;