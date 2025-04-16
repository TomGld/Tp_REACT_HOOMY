import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProfile, setLoading } from "../../store/profile/profileSlice";
import { API_URL, LOGOS_URL } from "../../constants/apiConstant";
import ProfileList from "../../components/Profile/profileList";
import PageLoader from "../../components/Loader/PageLoader";
import selectProfileData from "../../store/profile/profileSelector";
import axios from "axios";
import { useAuthContext } from "../../contexts/AuthContext";


const Login = () => {
  const dispatch = useDispatch();
  const [pinCode, setPinCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { loading, profileDetail } = useSelector(selectProfileData);
  const [selectedProfile, setSelectedProfile] = useState(null);
  console.log("selectedProfile", selectedProfile);

  const { signIn } = useAuthContext();

  useEffect(() => {
    dispatch(fetchAllProfile());
  }, [dispatch]);

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
    setPinCode('');
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    setErrorMessage('');

    try {
      const response = await axios.get(`${API_URL}/profiles/${selectedProfile.id}`)
      console.log("response", response);

      if (!response.data) {
        setErrorMessage('Code PIN incorrect');
      } else {
        const pin = response.data.pinCode;
        
        if (pin != pinCode) {
          setErrorMessage('Code PIN incorrect');
          return;
        } else {
          const loggedInProfile = {
            profileId: response.data.id,
            name: response.data.name,
          };
          signIn(loggedInProfile);
          window.location.reload();
          setSelectedProfile(loggedInProfile);
        }
      }
    } catch (error) {
      console.error(`Erreur de connexion : ${error}`);
      setErrorMessage("Une erreur est survenue lors de la connexion.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      {loading ? <PageLoader /> : (
        <>
         <div className='w-full flex justify-center items-center py-8 rounded-lg  '>
            <img src={`${LOGOS_URL}/LogoX2.png`} alt='logo' className='h-20 object-contain' />
          </div>
          <ProfileList
            profiles={profileDetail}
            onSelect={handleProfileSelect}
            selectedProfile={selectedProfile}
            pinCode={pinCode}
            onPinChange={(e) => setPinCode(e.target.value)}
            onSubmitPin={handleSubmit}
            errorMessage={errorMessage}
          />
        </>
      )}
    </div>
  );
};

export default Login;