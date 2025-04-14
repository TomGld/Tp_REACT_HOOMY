import React from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
import { FiLogOut } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {

  const { signOut } = useAuthContext()
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/');
  }

  const handleredirect = () => {
    navigate('/rooms');
  }
  return (
    <div>
      <button onClick={() => {
        const confirmLogout = window.confirm('Voulez-vous vraiment vous déconnecter ?');
        if (confirmLogout) handleLogout();
      }}
        className='link-sidebar'>
        <FiLogOut className='w-6 h-6 mr-2' />
        deconnexion
      </button>
      <Link to="/rooms">rooms</Link>
    </div>
  )

}

export default Home