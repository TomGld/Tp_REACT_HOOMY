import React from 'react'
import { ROOMSIMG_URL } from '../../constants/apiConstant'

const DetailTop = ({ roomDetails }) => {
  return (
    <div className="w-full">
      {roomDetails?.image?.imagePath && (
        <div className="mb-6">
          <img
            src={`${ROOMSIMG_URL}/${roomDetails.image.imagePath}`}
            alt={roomDetails.label}
            className="w-full max-h-[400px] object-cover rounded-b-xl shadow-md"
          />
        </div>
      )}
    </div>
  )
}

export default DetailTop