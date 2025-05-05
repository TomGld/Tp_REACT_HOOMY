import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPlaylist, fetchAllPlaylists } from '../../store/playlist/playlistSlice';
import PageLoader from '../../components/Loader/PageLoader';
import selectPlaylistData from '../../store/playlist/playlistSelector';
import Card from '../../components/Card/Card';
import { BiPlus } from 'react-icons/bi';

const Playlist = () => {
  const dispatch = useDispatch();
  const { loading, allPlaylists } = useSelector(selectPlaylistData);
  const [label, setLabel] = useState('');

  useEffect(() => {
    fetchAllPlaylists(dispatch);
  }, [dispatch]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (label.trim() !== '') {
      await createPlaylist(dispatch, label); 
      
      setLabel('');
      fetchAllPlaylists(dispatch);
    }
  };

  return loading ? (
    <PageLoader />
  ) : (
    <div className="p-6 bg-white-primary rounded-xl shadow-md">
      {/* Create New Playlist Form */}
      <form onSubmit={handleSubmit} className="flex justify-center gap-4 mb-6">
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Nom de la playlist"
          className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple"
        />
        <button
          type="submit"
          className="bg-purple hover:bg-orange-primary transition duration-300 px-6 py-2 rounded-full flex items-center gap-2 text-white-primary font-medium shadow-md"
        >
          <BiPlus size={20} />
          Créer
        </button>
      </form>

      {/* List of Playlists */}
      <ul className="space-y-2">
        {allPlaylists.length === 0 ? (
          <li className="text-gray-500 text-center">Aucune playlist trouvée.</li>
        ) : (
          allPlaylists.map((playlist) => (
            <li key={playlist.id} className="flex flex-wrap justify-center lg:justify-start gap-8">
              <Card data={playlist} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Playlist;