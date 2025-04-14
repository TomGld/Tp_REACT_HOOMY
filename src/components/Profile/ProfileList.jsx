import React from "react";
import { AVATARS_URL } from "../../constants/apiConstant";

const ProfileList = ({
  profiles,
  onSelect,
  selectedProfile,
  pinCode,
  onPinChange,
  onSubmitPin
}) => {
  if (!profiles || profiles.length === 0) {
    return <p className="text-center text-gray-500">Aucun profil trouvé.</p>;
  }

  return (
    <div className="flex flex-wrap gap-8 justify-center">
      {profiles.map((profile) => {
        const isSelected = selectedProfile && selectedProfile.id === profile.id;

        return (
          <div
            key={profile.id}
            onClick={() => onSelect(profile)}
            className='text-center cursor-pointer p-4 rounded-lg transition-all duration-300 w-44'
          >
            <img
              src={`${AVATARS_URL}/${profile.imagePath}`}
              alt={`Avatar de ${profile.name}`}
              className="w-36 h-36 rounded-full object-cover mb-2 mx-auto"
            />
            <h4 className="text-lg font-medium">{profile.name}</h4>

            {/* PIN input only for selected profile */}
            {isSelected && (
              <form
                onClick={(e) => e.stopPropagation()} // prevent onSelect re-trigger
                onSubmit={onSubmitPin}
                className="mt-3"
              >
                <input
                  type="password"
                  placeholder="Code PIN"
                  value={pinCode}
                  onChange={onPinChange}
                  className="mt-1 w-full px-3 py-1 border border-gray-400 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                />
                <button
                  type="submit"
                  className="mt-2 w-full bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                >
                  Se connecter
                </button>
              </form>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProfileList;