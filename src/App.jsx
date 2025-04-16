import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { PROFILE_INFOS } from './constants/appConstant';
import useAuthCheck from './hooks/useAuthCheck';
import TopBar from './components/Ui/TopBar';

const App = () => {
  const profile = JSON.parse(localStorage.getItem(PROFILE_INFOS));
  const [isLoading, setIsLoading] = useState(false);

  useAuthCheck(profile, setIsLoading);

  return (
    <>
      <TopBar />
      <Outlet />
    </>
  );
};

export default App;