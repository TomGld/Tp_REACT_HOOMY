import React from 'react'
import { API_ROOT, IMAGES_URL, LOGOS_URL } from '../../constants/apiConstant'
import { Outlet } from 'react-router-dom'
import ButtonLoader from '../../components/Loader/ButtonLoader'


const HomeOffline = () => {
const [loading, setLoading] = useState(false)
  return (
    loading ? <ButtonLoader/> :
    <div className='flex flex-col w-screen h-screen items-center px-4 bg-black bgopacity-50 bg-center bg-contain'>
      <div className='w-full md:w-3/4n lg:w-1/2 h-screen flex flex-col justify-center items-center bg-black_05'>
        <div className='w-full flex justify-center items-center py-8 rounded-lg'>
          <img src={`${LOGOS_URL}/LogoX2.png`} alt='logo' className='h-20 object-contain' />
        </div>
        <div className='flex justify-center items-center px-4 w-full rounded-lg mt-4'>
          <Outlet />
          
        </div>
      </div>
    </div>
  )
}

export default HomeOffline