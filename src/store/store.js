
import { configureStore } from '@reduxjs/toolkit';
import profilesReducer from './profile/profileSlice';
import roomsReducer from './room/roomSlice';
import devicesReducer from './device/deviceSlice';
import vibesReducer from './Vibe/vibeSlice';

const store = configureStore({
    reducer: {
        //TODO: ajouter les reducers ici
        profiles: profilesReducer,
        rooms: roomsReducer,
        devices: devicesReducer,
        vibes: vibesReducer,
    }
});

export default store;
