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
            <div className="topbar" style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                padding: '10px 20px',
                backgroundColor: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}>
                {/* Search Icon */}
                <div style={{
                    position: 'absolute',
                    left: '20px',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <FaSearch size={22} color="#666" />
                </div>

                {/* Logo */}
                <a href="/" style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <img
                        src={`${LOGOS_URL}/logoSmallX2.png`}
                        alt="Logo"
                        style={{ height: '35px' }}
                    />
                </a>

                {/* Account Icon */}
                <div style={{ marginRight: '10px', position: 'relative' }}>
                    <MdAccountCircle
                        size={35}
                        style={{ cursor: 'pointer', transition: 'color 300ms' }}
                        onMouseEnter={() => setShowDropdown(true)}
                        onMouseLeave={() => setShowDropdown(false)}
                    />

                    {/* Dropdown */}
                    {showDropdown && (
                        <div
                            onMouseEnter={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                            style={{
                                position: 'absolute',
                                top: '45px',
                                right: 0,
                                backgroundColor: 'white',
                                border: '1px solid #eee',
                                borderRadius: '8px',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                padding: '10px',
                                zIndex: 1000,
                                minWidth: '150px'
                            }}
                        >
                            <button
                                onClick={() => {
                                    const confirmLogout = window.confirm('Voulez-vous vraiment vous déconnecter ?');
                                    if (confirmLogout) handleLogout();
                                }}
                                className='link-sidebar'
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#333',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '14px'
                                }}
                            >
                                <FiLogOut className='w-5 h-5 mr-2' />
                                Déconnexion
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '16px',
                marginTop: '10px',
                flexWrap: 'wrap'
            }}>
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
                            style={{
                                backgroundColor: isActive ? 'var(--color-rose)' : 'transparent',
                                color: isActive ? 'white' : '#333',
                                border: 'none',
                                padding: '8px 18px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: '500',
                                fontSize: '14px',
                                transition: 'all 0.3s ease'
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