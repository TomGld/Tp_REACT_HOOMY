import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchRoomDetails } from '../../store/room/roomSlice'
import selectRoomData from '../../store/room/roomSelector'
import PageLoader from '../../components/Loader/PageLoader'
import DetailTop from '../../components/Detail/DetailTop'
import { BiPlus } from 'react-icons/bi'
import Device from '../../components/Device'
import ButtonVibe from '../../components/Detail/ButtonVibe'

const RoomDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { roomDetails, loading } = useSelector(selectRoomData);

  const roomDevices = roomDetails?.devices || [];
  console.log(roomDevices);
  const roomVibes = roomDetails?.vibe || [];

  useEffect(() => {
    dispatch(fetchRoomDetails(id));
  }, [dispatch, id]);

  return (
    loading ? <PageLoader /> : (
      <div className="bg-white-primary min-h-screen py-8 px-4">
        <DetailTop roomDetails={roomDetails} />

        {/* Room Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800">
            {roomDetails?.label}
          </h1>
        </div>

        {/* Add Device Button */}
        <div className="flex justify-center mb-6">
          <Link
            to={`/rooms/${id}/add-device`}
            className="bg-purple hover:bg-orange-primary transition duration-300 px-6 py-3 rounded-full flex items-center gap-2 text-white-primary font-medium shadow-md"
          >
            <BiPlus size={20} />
            Ajouter un objet connecté...
          </Link>
        </div>

       <Device dataDevices={roomDevices} />
       <ButtonVibe dataVibe={roomVibes} />
      </div>
    )
  );
};

export default RoomDetail;