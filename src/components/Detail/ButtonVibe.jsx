import { CButton } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { SlArrowDown, SlArrowUp } from 'react-icons/sl'
import VibeSmall from '../Card/VibeSmall';
import { useDispatch, useSelector } from 'react-redux';
import selectVibeData from '../../store/Vibe/vibeSelector';
import { fetchVibe } from '../../store/Vibe/vibeSlice';

const ButtonVibe = ({ dataVibe }) => {
  const dispatch = useDispatch();
  const [collapse, setCollapse] = useState(false);
  const { vibes, loading } = useSelector(selectVibeData);
  const data = dataVibe


  useEffect(() => {
    dispatch(fetchVibe())
  }, [dispatch])

  const handleCollapse = () => {
    setCollapse(!collapse);
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Button-like Container */}
      <div
        className="bg-purple hover:bg-orange-primary transition duration-300 px-6 py-4 rounded-xl text-white-primary shadow-md text-center cursor-pointer"
        onClick={handleCollapse}
      >
        {/* Top: Title + Arrow */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="font-medium text-sm">
            {data.length > 0
              ? `Chambre liée à ${data.map(vibe => vibe.label).join(', ')}`
              : 'Click to associate vibes to this room.'}
          </span>
          {collapse ? (
            <SlArrowUp size={12} className="inline-block" />
          ) : (
            <SlArrowDown size={12} className="inline-block" />
          )}
        </div>

        {/* Collapsible content */}
        {collapse && (
          <div className="mt-3 text-left">
            <CButton isOpen={collapse} className="flex flex-wrap items-center justify-center gap-4">
              {vibes.map((vibe) => (
                <VibeSmall
                  vibe={vibe}
                  key={vibe.id}
                />
              ))}
            </CButton>
          </div>
        )}
      </div>
    </div>
  )
}

export default ButtonVibe