import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRooms } from '../../store/room/roomSlice';
import selectRoomData from '../../store/room/roomSelector';
import PageLoader from '../../components/Loader/PageLoader';
import Card from '../../components/Card/Card';

const Room = () => {
  const { loading, rooms } = useSelector(selectRoomData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch])


  return (
    loading ? <PageLoader /> : (
      <div className="bg-white-primary min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center lg:justify-start gap-8">
          {rooms.map((room, index) => (
            <Card
              data={room}
              key={room.id}
              index={index}
            />
          ))}
        </div>
      </div>
    )
  );
}

export default Room