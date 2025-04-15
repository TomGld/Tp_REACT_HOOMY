
import { configureStore } from '@reduxjs/toolkit';
import profilesReducer from './profile/profileSlice';
import roomsReducer from './room/roomSlice';

const store = configureStore({
    reducer: {
        //TODO: ajouter les reducers ici
        profiles: profilesReducer,
        rooms: roomsReducer,
    }
});

export default store;
