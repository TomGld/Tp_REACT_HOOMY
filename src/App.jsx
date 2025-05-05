import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { PROFILE_INFOS } from './constants/appConstant';
import useAuthCheck from './hooks/useAuthCheck';
import TopBar from './components/Ui/TopBar';
import Footer from './components/Ui/Footer';

const App = () => {
  const profile = JSON.parse(localStorage.getItem(PROFILE_INFOS));
  const [isLoading, setIsLoading] = useState(false);

  useAuthCheck(profile, setIsLoading);

  return (
    <div className="pb-10"> {/* Ajout d'un padding-bottom */}
      <TopBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;