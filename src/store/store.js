
import { configureStore } from '@reduxjs/toolkit';
import profilesReducer from './profile/profileSlice';

const store = configureStore({
    reducer: {
        //TODO: ajouter les reducers ici
        profiles: profilesReducer,
    }
});

export default store;
