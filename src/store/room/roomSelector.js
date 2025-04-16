import { createSelector } from "@reduxjs/toolkit";

const selectLoading = (state) => state.rooms.loading;
const selectRooms = (state) => state.rooms.rooms;
const selectRoomDetails = (state) => state.rooms.roomDetails;

const selectRoomData = createSelector(

    [selectLoading, selectRooms, selectRoomDetails],
    (loading, rooms, roomDetails) => ({ loading, rooms, roomDetails })

);
export default selectRoomData;