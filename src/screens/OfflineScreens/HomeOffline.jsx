import React, { useState } from 'react'
import { LOGOS_URL } from '../../constants/apiConstant'
import { Outlet } from 'react-router-dom'
import PageLoader from '../../components/Loader/PageLoader'


const HomeOffline = () => {
  const [loading, setLoading] = useState(false)
  return (
    loading ? <PageLoader /> :
      <div className='flex flex-col w-screen h-screen items-center px-4 bg-purple-title bg-center bg-contain'>
        <div className='h-screen flex flex-col justify-center'>
          <div className='flex justify-center items-center px-4 w-full rounded-lg mt-4'>
            <Outlet />
          </div>
        </div>
      </div>
  )
}

export default HomeOffline