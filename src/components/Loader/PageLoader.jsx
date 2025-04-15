import React from 'react'
import { BarLoader } from 'react-spinners'
import { LOGOS_URL } from '../../constants/apiConstant'

const PageLoader = () => {
    return (
        <>
            <div className='flex flex-col w-screen h-screen items-center px-4 bg-purple-title bg-center bg-contain'>
                <div className='h-screen flex flex-col justify-center'>
                    <div className='w-full flex justify-center items-center py-8 rounded-lg  '>
                        <img src={`${LOGOS_URL}/LogoX2.png`} alt='logo' className='h-20 object-contain' />
                    </div>
                    <div className='flex flex-wrap gap-8 justify-center'>
                        <BarLoader
                            width={400}
                            color='#F08A4F'
                        />
                    </div>
                </div>
            </div>
        </>
    )

}

export default PageLoader