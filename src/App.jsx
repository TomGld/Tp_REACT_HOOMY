import React from 'react'
import { Outlet } from 'react-router-dom'
import { PROFILE_INFOS } from './constants/appConstant';
import useAuthCheck from './hooks/useAuthCheck';

const App = () => {

  //on récupère les infos de l'user dans le localstorage
  const profile = JSON.parse(localStorage.getItem(PROFILE_INFOS));

  //on vérifie que l'utilisateur en session est bien le bon
  useAuthCheck(profile);



  return (
    <>
      <Outlet />
    </>
  )
}

export default App