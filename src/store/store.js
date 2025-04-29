
import { configureStore } from '@reduxjs/toolkit';
import profilesReducer from './profile/profileSlice';
import roomsReducer from './room/roomSlice';
import vibeReducer from './vibe/vibeSlice';
import settingDataReducer from './settingData/settingDataSlice';


const store = configureStore({
    reducer: {
        profiles: profilesReducer,
        rooms: roomsReducer,
        vibe: vibeReducer,
        settingdata: settingDataReducer,
    }
});

export default store;
