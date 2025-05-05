import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { RiDeleteBin6Fill } from 'react-icons/ri';

const SongList = ({ dataSongs, onClick }) => {
  const { id } = useParams();
  const location = useLocation();
  const showDelete = location.pathname === `/playlists/${id}/add-song`;
  console.log(dataSongs);
  

  return (
    <div className="max-w-3xl mx-auto mb-8">
      {Array.isArray(dataSongs) && dataSongs.length > 0 ? (
        <ul className="space-y-3 text-gray-700">
          {dataSongs.map((song) => (
            <li
              key={song.id}
              className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded-md shadow-sm"
            >
              <div>
                <span className="font-semibold block">{song.title}</span>
                <span className="text-sm text-gray-500">
                  Artist: {song.artist} • Duration: {song.duration}
                </span>
              </div>

              {showDelete && (
                <RiDeleteBin6Fill
                  onClick={() => onClick(song.id)}
                  className="text-red-500 cursor-pointer hover:text-red-700 transition ml-4"
                  size={20}
                />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic text-center">No songs found in this playlist.</p>
      )}
    </div>
  );
};

export default SongList;