import { createSelector } from "@reduxjs/toolkit";

const selectLoading = (state) => state.playlist.loading;
const selectPlaylist = (state) => state.playlist.newPlaylist;
const selectMusic = (state) => state.playlist.music;
const selectAllPlaylists = (state) => state.playlist.allPlaylists;
const selectAllMusic = (state) => state.playlist.allMusic;

const selectPlaylistData = createSelector(

    [selectLoading, selectPlaylist, selectMusic, selectAllPlaylists, selectAllMusic],
    (loading, newPlaylist, music, allPlaylists, allMusic) => ({ loading, newPlaylist, music, allPlaylists, allMusic })

);
export default selectPlaylistData;