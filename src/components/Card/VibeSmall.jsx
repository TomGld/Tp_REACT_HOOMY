import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { ICONES_URL, LOGOS_URL, ROOMS_URL, VIBES_URL } from '../../constants/apiConstant';
import { useSelector } from 'react-redux';
import selectVibeData from '../../store/Vibe/vibeSelector';
import axios from 'axios';


const VibeSmall = ({ vibe }) => {
  const location = useLocation();
  const isRoomPage = location.pathname.startsWith('/rooms/');
  const { id } = useParams();
  const [roomId] = useState(id);
  const [selectedVibe, setSelectedVibe] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { vibes, loading } = useSelector(selectVibeData);


  return (
    <div>
      <div className="flex flex-wrap justify-center items-center gap-4">
          <a
            href={`/vibes/${vibe.id}`}
            className="no-underline text-inherit w-[120px] h-[150px] bg-[#e5dfdb] rounded-[70px_70px_20px_20px] shadow-md relative flex flex-col items-center justify-end pb-[15px] font-sans m-[3px]"
          >
            <div className="absolute top-[20px] w-[70px] h-[70px] bg-white rounded-full overflow-hidden flex items-center justify-center">
              <img
                src={vibe.image?.imagePath ? `${ICONES_URL}/${vibe.image.imagePath}` : `${LOGOS_URL}/logoSmallX2.png`}
                alt={vibe.label || 'Vibe'}
                className="w-[80%] h-[80%] object-cover"
              />
            </div>
            <span className="text-[#1c1c3c] text-[16px] font-bold z-10 text-center">
              {vibe.label || 'Inconnu'}
            </span>
          </a>
      </div>
    </div>
  )
}

export default VibeSmall