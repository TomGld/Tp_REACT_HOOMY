import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import PageLoader from '../../components/Loader/PageLoader';
import DetailTop from '../../components/Detail/DetailTop';
import selectPlaylistData from '../../store/playlist/playlistSelector';
import { fetchAllMusic, fetchPlaylistDetails } from '../../store/playlist/playlistSlice';
import SongList from '../../components/SongList';
import Songs from '../../components/SongList/Songs';

const PlaylistDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { music, loading, allMusic } = useSelector(selectPlaylistData);
  const [collapse, setCollapse] = useState(false);

  const playlistMusic = music?.playlisttracks_loop;

  useEffect(() => {
    fetchPlaylistDetails(dispatch, id);
    // Optionally: dispatch(fetchAvailableSongs());
  }, [dispatch, id]);

  useEffect(() => {
    fetchAllMusic(dispatch);
  }, [dispatch]);

  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  return loading ? (
    <PageLoader />
  ) : (
    <div className="bg-white-primary min-h-screen py-8 px-4">
      <DetailTop roomDetails={music} />

      {/* Playlist Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">
          {music?.__playlistTitle || 'Playlist'}
        </h1>
      </div>

      {/* Add Song Collapse - styled like ButtonVibe */}
      <div className="max-w-3xl mx-auto mb-10">
        <div
          className="bg-purple hover:bg-orange-primary transition duration-300 px-6 py-4 rounded-xl text-white-primary shadow-md text-center cursor-pointer"
          onClick={handleCollapse}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="font-medium text-sm">
              {collapse ? 'Masquer les chansons disponibles' : 'Ajouter des chansons à la playlist'}
            </span>
            {collapse ? (
              <SlArrowUp size={12} className="inline-block" />
            ) : (
              <SlArrowDown size={12} className="inline-block" />
            )}
          </div>

          {collapse && (
            <div className="mt-3 text-left">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Songs songs={allMusic} playlistId={id} />
              </div>
            </div>
          )}
        </div>
      </div>

      <SongList dataSongs={playlistMusic} />
    </div>
  );
};

export default PlaylistDetail;