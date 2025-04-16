import React from 'react'
import { BarLoader } from 'react-spinners'
import { LOGOS_URL } from '../../constants/apiConstant'

const PageLoader = () => {
    return (
        <div className="flex flex-col w-screen h-screen items-center justify-center px-4 bg-purple-title bg-center bg-cover">
          <div className="flex flex-col items-center gap-8 animate-fadeIn">
            <img
              src={`${LOGOS_URL}/LogoX2.png`}
              alt="logo"
              className="h-20 object-contain"
            />
            <BarLoader width={300} color="#F08A4F" />
          </div>
        </div>
      );
}

export default PageLoader