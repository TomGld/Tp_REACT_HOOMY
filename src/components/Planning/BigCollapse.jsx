import { Switch } from '@headlessui/react';
import React, { useEffect, useState } from 'react'
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import selectVibeData from '../../store/vibe/vibeSelector';
import selectRoomData from '../../store/room/roomSelector';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVibe } from '../../store/vibe/vibeSlice';
import { fetchRooms } from '../../store/room/roomSlice';

const BigCollapse = (selectedDate) => {
  const { vibes } = useSelector(selectVibeData);
  const { rooms } = useSelector(selectRoomData);
  const [vibe, setVibe] = useState('');
  const [room, setRoom] = useState([]);
  const [collapse, setCollapse] = useState(false);
  const [vibeCollapse, setVibeCollapse] = useState(false);
  const [roomCollapse, setRoomCollapse] = useState(false);
  const [isAllDay, setIsAllDay] = useState(false);
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('17:00');
  const [recurrence, setRecurrence] = useState('');
  const dispatch = useDispatch();
  const selectedDateValue = selectedDate.selectedDate
  console.log("selectedDateValue", selectedDateValue);
  useEffect(() => {
    dispatch(fetchVibe());
}, [dispatch]);

useEffect(() => {
    dispatch(fetchRooms());
}, [dispatch]);


  const handleCollapse = () => setCollapse(!collapse);
  const handleVibeCollapse = (e) => {
    e.stopPropagation();
    setVibeCollapse(!vibeCollapse);
  };
  const handleRoomCollapse = (e) => {
    e.stopPropagation();
    setRoomCollapse(!roomCollapse);
  };
  return (
    < div className="bg-purple hover:bg-orange-primary transition duration-300 px-6 py-4 rounded-xl text-white-primary shadow-md cursor-pointer w-full" >
      <div className="flex items-center justify-between" onClick={handleCollapse}>
        <span className="font-medium text-sm">Ajouter un événement</span>
        {collapse ? <SlArrowUp size={12} /> : <SlArrowDown size={12} />}
      </div>

      {/* Collapse Content */}
      {
        collapse && (
          <div
            className="mt-4 bg-white p-6 rounded-xl text-black shadow-md space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">Jour entier</span>
              <Switch
                checked={isAllDay}
                onChange={setIsAllDay}
                className={`${isAllDay ? 'bg-purple' : 'bg-gray-300'} relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span
                  className={`${isAllDay ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>

            <div className="flex justify-between gap-4">
              <div className="w-full">
                <label className="block text-sm font-medium">Début</label>
                <input
                  type="text"
                  value={selectedDateValue.toLocaleDateString('fr', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                  disabled
                  className="mt-1 w-full bg-transparent text-black outline-none"
                />
              </div>
              {!isAllDay && (
                <div className="w-full">
                  <label className="block text-sm font-medium">Heure</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="mt-1 w-full bg-transparent text-black outline-none"
                  />
                </div>
              )}
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium">Fin</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="mt-1 w-full bg-transparent text-black outline-none"
                disabled={isAllDay}
              />
            </div>

            <div className="w-full">
              <label className="text-sm font-medium">Récurrence</label>
              <input
                type="text"
                value={recurrence}
                onChange={(e) => setRecurrence(e.target.value)}
                className="mt-1 w-full bg-transparent text-black outline-none"
              />
            </div>

            {/* Vibe Collapse */}
            <div className="bg-purple mt-6 hover:bg-orange-primary transition duration-300 px-6 py-4 rounded-xl text-white-primary shadow-md text-center cursor-pointer">
              <div className="flex items-center justify-between" onClick={handleVibeCollapse}>
                <span className="font-medium text-sm">Lier l'événement à une ambiance</span>
                {vibeCollapse ? <SlArrowUp size={12} /> : <SlArrowDown size={12} />}
              </div>
              {vibeCollapse && (
                <div className="mt-3 text-left text-black bg-white p-4 rounded-xl" onClick={(e) => e.stopPropagation()}>
                  {vibes.length > 0 ? (
                    <ul className="space-y-2">
                      {vibes.map((v) => (
                        <li key={v.id} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="vibe"
                            value={v.id}
                            checked={vibe === v.id}
                            onChange={() => setVibe(v.id)}
                          />
                          <label>{v.label}</label>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>Aucune ambiance disponible</p>
                  )}
                </div>
              )}
            </div>

            {/* Room Collapse */}
            <div className="bg-purple mt-6 hover:bg-orange-primary transition duration-300 px-6 py-4 rounded-xl text-white-primary shadow-md text-center cursor-pointer">
              <div className="flex items-center justify-between" onClick={handleRoomCollapse}>
                <span className="font-medium text-sm">Lier l'événement à une chambre</span>
                {roomCollapse ? <SlArrowUp size={12} /> : <SlArrowDown size={12} />}
              </div>
              {roomCollapse && (
                <div className="mt-3 text-left text-black bg-white p-4 rounded-xl" onClick={(e) => e.stopPropagation()}>
                  {rooms.length > 0 ? (
                    <ul className="space-y-2">
                      {rooms.map((r) => (
                        <li key={r.id} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            value={r.id}
                            checked={room.includes(r.id)}
                            onChange={(e) => {
                              const selectedRooms = [...room];
                              if (e.target.checked) {
                                selectedRooms.push(r.id);
                              } else {
                                const index = selectedRooms.indexOf(r.id);
                                selectedRooms.splice(index, 1);
                              }
                              setRoom(selectedRooms); // Update the state with selected rooms
                            }}
                          />
                          <label>{r.label}</label>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>Aucune chambre disponible</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )
      }
    </div >
  );
};
export default BigCollapse