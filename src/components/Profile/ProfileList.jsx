import React, { useState } from "react";
import { AVATARS_URL } from "../../constants/apiConstant";

const ProfileList = ({ profiles }) => {
  if (!profiles || profiles.length === 0) {
    return <p>Aucun profil trouvé.</p>;
  }

  const [activeProfile, setActiveProfile] = useState(null);

  const togglePinInput = (profileId) => {
    setActiveProfile(activeProfile === profileId ? null : profileId);
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      {profiles.map((profile) => (
        <div
          key={profile.id}
          onClick={() => togglePinInput(profile.id)}
          style={{
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          <img
            src={`${AVATARS_URL}/${profile.imagePath}`}
            alt="Avatar du profil"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          {activeProfile === profile.id && (
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#fff",
                padding: "1rem",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                zIndex: 1000,
              }}
            >
              <p>Entrez votre code PIN :</p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "0.5rem",
                }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                  <button
                    key={num}
                    style={{
                      padding: "0.5rem",
                      backgroundColor: "#f0f0f0",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setActiveProfile(null)}
                style={{
                  marginTop: "1rem",
                  padding: "0.5rem",
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Fermer
              </button>
            </div>
          )}
        </div>
      ))}
      {activeProfile && (
        <div
          onClick={() => setActiveProfile(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
        />
      )}
    </div>
  );
};

export default ProfileList;