import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import React from 'react';
import { set } from 'date-fns/set';

// Redux slice
const playlistSlice = createSlice({
    name: 'playlist',
    initialState: {
        loading: false,
        allPlaylists: [],
        newPlaylist: [],
        allMusic: [],
        music: [],
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setMusic: (state, action) => {
            state.music = action.payload;
        },
        setAllMusic: (state, action) => {
            state.allMusic = action.payload;
        },
        setNewPlaylist: (state, action) => {
            state.playlist = action.payload;
        },
        setAllPlaylists: (state, action) => {
            state.allPlaylists = action.payload;
        },
    },
});

export const { setLoading, setMusic, setNewPlaylist, setAllPlaylists, setAllMusic } = playlistSlice.actions;


export const fetchAllMusic = async (dispatch, start = 0, limit = 100) => {
    try {
        dispatch(setLoading(true));

        const response = await axios.post('http://localhost:8080/api/music', {
             start:0,
              limit: 100,
        });

        const musicList = response.data.titles_loop || [];
        dispatch(setAllMusic(musicList));
    } catch (error) {
        console.error('Error fetching music:', error);
    } finally {
        dispatch(setLoading(false));
    }
};

// méthode pour créer une playlist
export const createPlaylist = async (dispatch, playlistName, profileName) => {
    try {
        dispatch(setLoading(true));
        console.log('Creating playlist with name:', playlistName);
        

        const response = await axios.post('http://localhost:8080/api/playlist/create', {
            profile: profileName,
            name: playlistName,
        })

        const newPlaylist = response.data;
        dispatch(setNewPlaylist(newPlaylist));
    } catch (error) {
        console.error('Error creating playlist:', error);
    } finally {
        dispatch(setLoading(false));
    }
};

// méthode pour récupérer toutes les playlists
export const fetchAllPlaylists = async (dispatch, start, limit, profileName) => {
    try {
        dispatch(setLoading(true));

        const response = await axios.post(`http://localhost:8080/api/playlists`, 
            {
                start: 0,
                limit: 100,
                profileName: profileName,
        });

        const Playlists = response.data.playlists_loop || [];
        console.log('Playlists:', Playlists);
        dispatch(setAllPlaylists(Playlists));
    } catch (error) {
        console.error('Error creating playlist:', error);
    } finally {
        dispatch(setLoading(false));
    }
};

// Méthode pour récupérer les détails d'une playlist
export const fetchPlaylistDetails = async (dispatch, playlistId) => {
    try {
        dispatch(setLoading(true));

        const response = await axios.post(`http://localhost:8080/api/playlists/${playlistId}`);

        const playlistDetails = response.data;
        console.log('Playlist Details:', playlistDetails);
        dispatch(setMusic(playlistDetails));
    } catch (error) {
        console.error('Error fetching playlist details:', error);
    } finally {
        dispatch(setLoading(false));
    }
};

export default playlistSlice.reducer;