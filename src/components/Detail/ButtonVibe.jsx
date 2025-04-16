import { CButton } from '@coreui/react'
import React, { useState } from 'react'
import { SlArrowDown, SlArrowUp } from 'react-icons/sl'
import InfoVibe from './infoVibe';

const ButtonVibe = ({dataVibe}) => {
  const [collapse, setCollapse] = useState(false);

    const data = dataVibe

    // méthode pour ouvrir et fermer le collapse
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
                {Array.isArray(data) && data.length > 0
                  ? `Chambre liée à ${data.map(vibe => vibe.label).join(', ')}`
                  : 'No vibes found for this room.'}
              </span>
              {collapse ? (
                <SlArrowUp size={12} className="inline-block" />
              ) : (
                <SlArrowDown size={12} className="inline-block" />
              )}
            </div>

            {/* Collapsible content (inside the box) */}
            {collapse && (
              <div className="mt-3 text-left">
                <CButton isOpen={collapse}>
                  <InfoVibe dataVibe={data} />
                </CButton>
              </div>
            )}
          </div>
        </div>
  )
}

export default ButtonVibe