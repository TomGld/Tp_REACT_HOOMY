import React from 'react';
import { BiPlusCircle } from 'react-icons/bi';

const Songs = ({ songs, playlistId, onAdd }) => {
  return (
    <div className="space-y-2">
      {songs && songs.length > 0 ? (
        songs.map((song) => (
          <div key={song.id} className="flex justify-between items-center bg-white px-4 py-2 rounded shadow-sm">
            <div>
              <p className="font-semibold">{song.title}</p>
              <p className="text-sm text-gray-500">Artiste : {song.artist}</p>
            </div>
            <BiPlusCircle
              size={24}
              className="text-green-600 hover:text-green-800 cursor-pointer"
              onClick={() => onAdd && onAdd(song.id, playlistId)}
            />
          </div>
        ))
      ) : (
        <p className="text-gray-500 italic">Aucune chanson disponible à ajouter.</p>
      )}
    </div>
  );
};

export default Songs;