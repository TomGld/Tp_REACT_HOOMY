import React, { useState } from 'react'
import { IMAGES_URL } from '../../constants/apiConstant'
import { Outlet } from 'react-router-dom'
import ButtonLoader from '../../components/Loader/ButtonLoader'


const HomeOffline = () => {
const [loading, setLoading] = useState(false)
  return (
    loading ? <ButtonLoader/> :
      <div className='w-full h-screen flex flex-col justify-center items-center'>

          <Outlet />
          
        </div>

  )
}

export default HomeOffline