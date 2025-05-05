import React, { useState } from 'react';
import { FaRegCircle } from 'react-icons/fa';
import { ICONES_URL } from '../../constants/apiConstant';

const Home = () => {
  const profile = JSON.parse(localStorage.getItem('profileInfos'));

  const [showMoodPanel, setShowMoodPanel] = useState(false);
  const [standards, setStandards] = useState({
    energy: 50,
    security: 50,
    emotion: 50,
    consciousness: 50,
  });

  const COLORS = {
    energy: '#f87171',        // red-400
    security: '#60a5fa',      // blue-400
    emotion: '#fbbf24',       // yellow-400
    consciousness: '#34d399'  // green-400
  };

  const RADIUS = 40;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  const total = Object.values(standards).reduce((a, b) => a + b, 0) || 1;

  // Calculate relative segments
  const circleSegments = Object.entries(standards).map(([key, value]) => {
    const percentage = value / total;
    return {
      key,
      color: COLORS[key],
      length: percentage * CIRCUMFERENCE
    };
  });

  let dashOffset = 0;

  return (
    <div className="bg-white-primary min-h-screen flex flex-col">
      {/* Contenu principal */}
      <div className="flex items-start mt-5 flex-wrap gap-5">
        {/* Mood Card */}
        <div className="bg-purple text-white-primary rounded-xl w-[370px] h-[200px] p-5 flex items-center">
          <div
            onClick={() => setShowMoodPanel(!showMoodPanel)}
            className="cursor-pointer flex flex-col justify-center"
          >
            <p>Votre mood actuel :</p>
            <p className="text-3xl font-bold mt-8 ml-2">GOOD
              MOOD
            </p>
          </div>

          {/* Donut chart */}
          <svg width="100" height="100">
            <circle
              cx="50"
              cy="50"
              r={RADIUS}
              stroke="white"
              strokeWidth="10"
              fill="none"
              opacity="0.1"
            />
            {circleSegments.map((segment) => {
              const dasharray = `${segment.length} ${CIRCUMFERENCE - segment.length}`;
              const circle = (
                <circle
                  key={segment.key}
                  cx="50"
                  cy="50"
                  r={RADIUS}
                  stroke={segment.color}
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={dasharray}
                  strokeDashoffset={-dashOffset}
                  transform="rotate(-90 50 50)"
                />
              );
              dashOffset += segment.length;
              return circle;
            })}
          </svg>
        </div>
      </div>

      {/* Mood Panel */}
      {showMoodPanel && (
        <div className="mt-6 bg-gray-100 p-5 rounded-xl w-full max-w-xl">
          {Object.keys(standards).map((key) => (
            <div key={key} className="mb-4">
              <label className="block font-semibold mb-1 capitalize">
                {key}:{' '}
                <span style={{ color: COLORS[key] }}>
                  {standards[key]}
                </span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={standards[key]}
                onChange={(e) =>
                  setStandards({ ...standards, [key]: parseInt(e.target.value) })
                }
                className="w-full"
                style={{
                  accentColor: COLORS[key],
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Section des raccourcis */}
      <div className="bg-purple rounded-t-3xl pb-20 pt-8 flex flex-col items-center mt-auto">
        <div className="flex flex-wrap gap-5 justify-center">
          {/* carré playlists */}
          <div
            className="bg-white rounded-xl w-[110px] h-[110px] sm:w-[150px] sm:h-[150px] lg:w-[200px] lg:h-[200px] p-2 flex flex-col items-start justify-between text-black relative cursor-pointer"
            onClick={() => (window.location.href = '/playlists')}
          >
            <img
              src={`${ICONES_URL}/MusicX2.png`}
              alt="Logo playlist"
              className="h-10 absolute top-2 left-2"
            />
            <span className="mt-auto ml-2">Playlists</span>
          </div>

          {/* carré pièces */}
          <div
            className="bg-white rounded-xl w-[110px] h-[110px] sm:w-[150px] sm:h-[150px] lg:w-[200px] lg:h-[200px] p-2 flex flex-col items-start justify-between text-black relative cursor-pointer"
            onClick={() => (window.location.href = '/rooms')}
          >
            <img
              src={`${ICONES_URL}/BedX2.png`}
              alt="Logo pièces"
              className="h-8 absolute top-2 left-2"
            />
            <span className="mt-auto ml-2">Pièces</span>
          </div>

          {/* carré planning */}
          <div
            className="bg-white rounded-xl w-[110px] h-[110px] sm:w-[150px] sm:h-[150px] lg:w-[200px] lg:h-[200px] p-2 flex flex-col items-start justify-between text-black relative cursor-pointer"
            onClick={() => (window.location.href = '/events')}
          >
            <img
              src={`${ICONES_URL}/CalendarX2.png`}
              alt="Logo planning"
              className="h-9 absolute top-2 left-2"
            />
            <span className="mt-auto ml-2">Planning</span>
          </div>

          {/* carré Ambiances */}
          <div
            className="bg-white rounded-xl w-[110px] h-[110px] sm:w-[150px] sm:h-[150px] lg:w-[200px] lg:h-[200px] p-2 flex flex-col items-start justify-between text-black relative cursor-pointer"
            onClick={() => (window.location.href = '/vibes')}
          >
            <img
              src={`${ICONES_URL}/LightX2.png`}
              alt="Logo ambiances"
              className="h-9 absolute top-2 left-2"
            />
            <span className="mt-auto ml-2">Ambiances</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
