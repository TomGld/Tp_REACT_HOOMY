import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRooms } from '../../store/room/roomSlice';
import selectRoomData from '../../store/room/roomSelector';
import PageLoader from '../../components/Loader/PageLoader';
import Card from '../../components/Card/Card';

const Room = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRooms());
    }, [dispatch])

    const { loading, rooms  } = useSelector(selectRoomData);
    console.log("data",rooms);

  return (
    loading ? <PageLoader /> :
    <div className="flex flex-wrap justify-center gap-6 px-4 sm:px-6 lg:px-8">
        {rooms.map((rooms, index) => (
            <Card
            data={rooms}
            key={rooms.id}
            index={index}
            />
           
        ))}
    </div>
  )
}

export default Room