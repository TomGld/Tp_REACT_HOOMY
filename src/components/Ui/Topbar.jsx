import React, { useState } from 'react'
import { FiLogOut } from 'react-icons/fi'
import { MdAccountCircle } from 'react-icons/md'
import { LOGOS_URL } from '../../constants/apiConstant'
import { FaSearch } from 'react-icons/fa'
import { useAuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'


const TopBar = () => {

    const { signOut } = useAuthContext()
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false); // Déclare l'état

    const handleLogout = () => {
        signOut();
        navigate('/');
    }

    return (
        <>
            <div className="topbar" style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>

              {/* Loupe de recherche */}
              <div style={{ position: 'absolute', left: '10px', display: 'flex', alignItems: 'center' }}>
                  <FaSearch 
                  size={25}
                  />
              </div>

              {/* Logo de l'application */}
              <img
                  src={`${LOGOS_URL}/logoSmallX2.png`}
                  alt="Logo"
                  style={{
                      position: 'absolute',
                      height: '35px',
                      left: '50%',
                      transform: 'translateX(-50%)'
                  }}
              />

              {/* Icone du compte */}
              <MdAccountCircle
                  size={35}
                  onMouseEnter={(e) => {
                      e.target.style.transition = 'color 300ms';
                      e.target.style.color = '#F08A4F';
                      setShowDropdown(true);
                  }}
                  onMouseLeave={(e) => {
                      e.target.style.transition = 'color 300ms';
                      e.target.style.color = '';
                      setShowDropdown(false);
                  }}
              />

              {/* Menu déroulant du compte */}
              {showDropdown && (
                  <div
                      onMouseEnter={() => setShowDropdown(true)}
                      onMouseLeave={() => setShowDropdown(false)}
                      style={{
                          position: 'absolute',
                          top: '75px',
                          right: '10px',
                          backgroundColor: 'white',
                          border: '1px solid #ccc',
                          borderRadius: '5px',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                          padding: '10px',
                          zIndex: 1000
                      }}
                  >
                      <button
                          onClick={() => {
                              const confirmLogout = window.confirm('Voulez-vous vraiment vous déconnecter ?');
                              if (confirmLogout) handleLogout();
                          }}
                          className='link-sidebar'
                          style={{ display: 'flex', alignItems: 'center' }}
                      >
                          <FiLogOut className='w-6 h-6 mr-2' />
                          Déconnexion
                      </button>
                  </div>
              )}
            </div>

            {/* Menu de navigation avec routes définies */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>
                {[
                    { name: 'Accueil', route: '/' },
                    { name: 'Pièce', route: '/rooms' },
                    { name: 'Ambiance', route: '/ambiance' },
                    { name: 'Planning', route: '/planning' }
                ].map(({ name, route }) => {
                    const isActive = window.location.pathname === route;
                    return (
                        <button
                            key={name}
                            onClick={() => navigate(route)}
                            style={{
                                backgroundColor: isActive ? 'var(--color-rose)' : 'transparent',
                                color: isActive ? 'white' : 'black',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                transition: 'background-color 300ms, color 300ms'
                            }}
                        >
                            {name}
                        </button>
                    );
                })}
            </div>
        </>
    )
}

export default TopBar