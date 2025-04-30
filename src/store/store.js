
import { configureStore } from '@reduxjs/toolkit';
import profilesReducer from './profile/profileSlice';
import roomsReducer from './room/roomSlice';
import vibesReducer from './vibe/vibeSlice';
import settingDataReducer from './settingData/settingDataSlice';
import devicesReducer from './device/deviceSlice';


const store = configureStore({
    reducer: {
        profiles: profilesReducer,
        rooms: roomsReducer,
        vibe: vibesReducer,
        settingdata: settingDataReducer,
        devices: devicesReducer,
    }
});

export default store;
