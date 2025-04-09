import React from "react";
 
const ProfileList = ({ profiles }) => { // Renommez "profileDetail" en "profiles"
  if (!profiles || profiles.length === 0) {
    return <p>Aucun profil trouvé.</p>;
  }
 
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      {profiles.map((profile) => (
        <div
          key={profile.id}
          style={{
            textAlign: "center",
            border: "1px solid #ccc",
            padding: "1rem",
            borderRadius: "8px",
          }}
        >
          <img src={profile.image} alt="" />
          <p><strong>Nom :</strong> {profile.name}</p>
          <p><strong>Code PIN :</strong> {profile.pinCode}</p>
        </div>
      ))}
    </div>
  );
}
 
export default ProfileList;
 