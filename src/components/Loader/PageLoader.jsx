import React from 'react'
import { BarLoader } from 'react-spinners'

const PageLoader = () => {
    return (
        <div className='flex flex-wrap gap-8 justify-center'>
            <BarLoader
                width={400}
                color='#F08A4F'
            />
        </div>
    )

}

export default PageLoader