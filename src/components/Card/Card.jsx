import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROOMSIMG_URL } from '../../constants/apiConstant';

const Card = ({ data }) => {
  const location = useLocation();

  const isPlaylistPage = location.pathname.startsWith('/playlists');

  const label = data?.label || data?.playlist || "Inconnu";
  const id = data?.id ?? 0;
  const imagePath = data?.image?.imagePath;
  const imageUrl = imagePath ? `${ROOMSIMG_URL}/${imagePath}` : "/default-image.png";

  const targetUrl = isPlaylistPage ? `/playlists/${id}` : `/rooms/${id}`;

  return (
    <Link
      to={targetUrl}
      className="w-full sm:w-[90%] lg:w-[40%] xl:w-[42%] flex flex-col items-center sm:items-center lg:items-start mb-8 mx-auto lg:mx-2 my-4"
    >
      <h2 className="text-xl font-bold mb-2 self-start">{label}</h2>
      <div className="w-full h-[300px] rounded-4xl overflow-hidden shadow-md">
        <img
          src={imageUrl}
          alt={`Image de ${label}`}
          className="w-full h-full object-cover"
        />
      </div>
    </Link>
  );
};

export default Card;