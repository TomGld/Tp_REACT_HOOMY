import { createSelector } from "@reduxjs/toolkit";

const selectLoading = (state) => state.rooms.loading;
const selectRooms = (state) => state.rooms.rooms;
const selectRoomsDetail = (state) => state.rooms.roomsDetail;

const selectRoomData = createSelector(

    [selectLoading, selectRooms, selectRoomsDetail],
    (loading, rooms, roomsDetail) => ({ loading, rooms, roomsDetail })

);
export default selectRoomData;