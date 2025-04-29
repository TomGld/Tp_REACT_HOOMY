import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import selectVibeData from '../../store/vibe/vibeSelector';
import { fetchVibeDetail } from '../../store/vibe/vibeSlice';
import VibeSmall from './VibeSmall';
import { Link, useParams } from 'react-router-dom';
import PageLoader from '../Loader/PageLoader';
import VibeForm from './VibeForm';
import Device from '../Device/Device';

const VibeDetail = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const { id } = param;

  // Récupération de la vibe dans le store
  const { loading, vibeDetail } = useSelector(selectVibeData);

  // Récupération des vibes existantes par le fetch
  useEffect(() => {
    dispatch(fetchVibeDetail(id));
  }, [dispatch, id]);

  console.log('vibeDetail', vibeDetail);

  // Regrouper les appareils par pièce
  const rooms = vibeDetail?.rooms || [];
  const settingData = vibeDetail?.settingData || [];

  const devicesByRoom = rooms.reduce((acc, room) => {
    acc[room.label] = settingData.filter(
      (data) => data.device?.room?.label === room.label
    );
    return acc;
  }, {});

  // Nouveau regroupement par Device ID
  const devicesGrouped = settingData.reduce((acc, data) => {
    const deviceId = data.device?.id;
    if (!deviceId) return acc;
    if (!acc[deviceId]) {
      acc[deviceId] = {
        device: data.device,
        settingDatas: [],
      };
    }
    acc[deviceId].settingDatas.push(data);
    return acc;
  }, {});

  console.log('devicesGrouped', devicesGrouped);

  return loading ? (
    // Afficher un loader si les données sont en cours de chargement
    <PageLoader />
  ) : (
    <div className="m-5">
      {/* Formulaire pour afficher ou modifier les détails de la vibe */}
      <VibeForm vibe={vibeDetail} />

      {/* Affichage de la liste des appareils */}
      {Object.values(
        Object.values(devicesGrouped).reduce((acc, group) => {
          const roomId = group.device?.room?.id;
          if (!roomId) return acc;

          if (!acc[roomId]) {
            acc[roomId] = {
              roomLabel: group.device?.room?.label,
              devices: [],
            };
          }
          acc[roomId].devices.push(group);
          return acc;
        }, {})
      ).map((roomGroup) => (
        <div
          key={roomGroup.roomLabel}
          className="border border-gray-300 mb-2 p-3 rounded-lg"
        >
          <h3 className="text-lg font-bold">{roomGroup.roomLabel}</h3>
          {roomGroup.devices.map((group) => (
            <Device
              key={group.device.id} // Clé propre avec ID du device
              groupdevices={group}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default VibeDetail;
