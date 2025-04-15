import React from 'react'
import { API_ROOT, AVATARS_URL, IMAGES_URL } from '../../constants/apiConstant';

const Card = ({ data, index }) => {
  const roomLabel = data?.label ?? "Room inconnu";
  const roomId = data?.id ?? 0;
  const roomImage = `${AVATARS_URL}/${data?.image?.imagePath}` ?? null;
  console.log("roomImage", roomImage);


  return (
    <div className="w-full sm:w-[90%] lg:w-[40%] xl:w-[42%] flex flex-col items-center sm:items-center lg:items-start mb-8 mx-auto lg:mx-2 my-4">
    <h2 className="text-xl font-bold mb-2 self-start">{roomLabel}</h2>
    <div className="w-full h-[300px] rounded-4xl overflow-hidden shadow-md">
      {roomImage && (
        <img
          src={roomImage}
          alt={`Image de ${roomLabel}`}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  </div>
  );
}

export default Card