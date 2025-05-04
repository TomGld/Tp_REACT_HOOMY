import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import selectVibeData from '../../store/vibe/vibeSelector';
import { fetchVibeDetail } from '../../store/vibe/vibeSlice';
import VibeSmall from './VibeSmall'; // Réintégration de l'import VibeSmall
import { useParams, Link } from 'react-router-dom'; // Réintégration de l'import Link
import PageLoader from '../Loader/PageLoader';
import VibeForm from './VibeForm';
import Device from '../Device/Device'; // Réintégration de l'import Device
import { fetchRooms } from '../../store/room/roomSlice';
import selectRoomData from '../../store/room/roomSelector';

const VibeDetail = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const { id } = param;

  // Récupération de la vibe dans le store
  const { loading, vibeDetail } = useSelector(selectVibeData);
  const { rooms } = useSelector(selectRoomData);

  // Récupération des vibes existantes par le fetch
  useEffect(() => {
    dispatch(fetchVibeDetail(id));
    dispatch(fetchRooms());
  }, [dispatch, id]);

  // console.log('vibeDetail', vibeDetail);
  // console.log('Rooms', rooms);

  // Filtrer les settingData pour chaque device
  const filterSettingDataByDeviceId = (deviceId) => {
    return vibeDetail?.settingData?.filter((setting) => setting.device.id === deviceId) || []; // Ensure function returns filtered settings
  };

  return loading ? (
    <PageLoader />
  ) : (
    <div className="m-5 mx-auto max-w-[70%]">
      <VibeForm vibe={vibeDetail} />
      <div className="pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rooms.map((room) => (
            <div key={room.id}>
              <h3>{room.label}</h3>
              {room?.devices?.map((device) => {
                const filteredSettings = filterSettingDataByDeviceId(device.id); // Pass correct device.id
                console.log('filteredSettings', filteredSettings);
                
                return (
                  <div key={device.id}>
                    <Device device={device} settingDatas={filteredSettings} vibeId={vibeDetail.id} /> {/* Réintégration de Device */}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VibeDetail;
