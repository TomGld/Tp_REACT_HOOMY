import React from 'react'
import { BarLoader } from 'react-spinners'
import { IMAGES_URL } from '../../constants/apiConstant'

const PageLoader = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <img src={`${IMAGES_URL}/logo/LogoX2.png`} alt='logo' className='h-20 object-contain' />
            <BarLoader
                width={400}
                color='#F08A4F'
            />
        </div>
    )
}

export default PageLoader