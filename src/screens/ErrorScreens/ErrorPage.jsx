import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleredirect = () => {
    navigate('/')
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <FaExclamationTriangle className='text-red-500 text-6xl mb-4' />
      <h1 className='text-4xl font-bold text-black mb-4'>Oops! Page non trouvée</h1>
      <p className='text-black text-lg mb-6'>La page que vous recherchez n'existe pas</p>
      <button className='px-4 py-2 bg-green hover:bg-green_top rounded-lg text-black cursor-pointer'
      onClick={() => handleredirect()}>
        Retour à l'accueil
      </button>
    </div>
  )
}

export default ErrorPage