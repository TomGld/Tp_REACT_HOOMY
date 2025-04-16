
import { configureStore } from '@reduxjs/toolkit';
import profilesReducer from './profile/profileSlice';
import roomsReducer from './room/roomSlice';
import vibeReducer from './vibe/vibeSlice';


const store = configureStore({
    reducer: {
        //TODO: ajouter les reducers ici
        profiles: profilesReducer,
        rooms: roomsReducer,
        vibe: vibeReducer,
    }
});

export default store;
