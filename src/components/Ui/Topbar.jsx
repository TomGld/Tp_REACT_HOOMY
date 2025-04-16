import React, { useState } from 'react'
import { FiLogOut } from 'react-icons/fi'
import { MdAccountCircle } from 'react-icons/md'
import { LOGOS_URL } from '../../constants/apiConstant'
import { FaSearch } from 'react-icons/fa'
import { useAuthContext } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'


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
            <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
                <img
                    src={`${LOGOS_URL}/logoSmallX2.png`}
                    alt="Logo"
                    className="h-9"
                />
            </Link>

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
                                              className="absolute top-11 right-2 bg-white border border-gray-300 rounded-md shadow-md p-2 z-50 cursor-pointer"
                                          >
                                              <button
                                                  onClick={() => {
                                          const confirmLogout = window.confirm('Voulez-vous vraiment vous déconnecter ?');
                                          if (confirmLogout) handleLogout();
                                      }}
                                      className='link-sidebar'
                                      style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} // Added cursor pointer
                                  >
                                      <FiLogOut className='w-6 h-6 mr-2' />
                                      Déconnexion
                                  </button>
                              </div>
                          )}
                        </div>

            {/* Menu de navigation avec routes définies */}
            <div className="relative flex justify-center gap-5 mt-2">
                {[
                    { name: 'Playlists', route: '/playlists' },
                    { name: 'Pièces', route: '/rooms' },
                    { name: 'Ambiances', route: '/vibes' },
                    { name: 'Planning', route: '/events' }
                ].map(({ name, route }) => {
                    const isActive = window.location.pathname === route;
                    return (
                        <button
                            key={name}
                            onClick={() => navigate(route)}
                            className={`px-4 py-2 rounded-md transition-colors duration-300 ${
                                isActive
                                    ? 'bg-rose text-white'
                                : 'bg-transparent text-black hover:bg-orange-primary'
                            }`}
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