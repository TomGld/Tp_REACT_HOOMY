import React, { useState } from 'react'
import TopBar from '../../components/Ui/TopBar'
import { FaRegCircle } from 'react-icons/fa';
import { ICONES_URL } from '../../constants/apiConstant';

const Home = () => {

  const profile = JSON.parse(localStorage.getItem('profileInfos'));

  return (
    <div style={{ backgroundColor: 'var(--color-white-primary)', minHeight: '100vh', padding: '20px' }}>
      <TopBar />

      <h1 style={{ fontWeight: 800, fontSize: 40 }}>Hello, {profile.name}</h1>

      {/* Conteneur flex pour mood analyse et raccourcis */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: '20px',
      }}>
        {/* mood analyse */}
        <div style={{
          backgroundColor: 'var(--color-purple)',
          borderRadius: '15px',
          width: '370px',
          height: '200px',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* div texte */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p className='text-white-primary'>Votre mood actuel :</p>
            <p className='text-white-primary text-3xl font-bold mt-8 ml-2'>GOOD <br />MOOD</p>
          </div>

          {/* div cercle */}
          <div>
            <FaRegCircle
              size={100} // Adjusted size
              color='white'
            />
          </div>
        </div>

        {/* Raccourcis */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          marginLeft: '20px',
        }}>
          {/* carré playlists */}
          <div style={{
            backgroundColor: 'var(--color-purple)',
            borderRadius: '15px',
            width: '125px',
            height: '125px',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            color: 'white',
            position: 'relative',
          }}>
            
            <img
              src={`${ICONES_URL}/MusicX2.png`}
              alt="Logo playlist"
              style={{ height: '40px', position: 'absolute', top: '10px', left: '10px' }}
            />
            <span style={{ marginTop: 'auto', marginLeft: '10px' }}>Playlists</span>
          </div>

          {/* carré pièces */}
          <div style={{
            backgroundColor: 'var(--color-purple)',
            borderRadius: '15px',
            width: '125px',
            height: '125px',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            color: 'white',
            position: 'relative',
          }}>
            <img
              src={`${ICONES_URL}/BedX2.png`}
              alt="Logo playlist"
              style={{ height: '30px', position: 'absolute', top: '10px', left: '10px' }}
            />
            <span style={{ marginTop: 'auto', marginLeft: '10px' }}>Pièces</span>
          </div>

          {/* carré planning */}
          <div style={{
            backgroundColor: 'var(--color-purple)',
            borderRadius: '15px',
            width: '125px',
            height: '125px',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            color: 'white',
            position: 'relative',
          }}>
            <img
              src={`${ICONES_URL}/CalendarX2.png`}
              alt="Logo playlist"
              style={{ height: '35px', position: 'absolute', top: '10px', left: '10px' }}
            />
            <span style={{ marginTop: 'auto', marginLeft: '10px' }}>Planning</span>
          </div>

          {/* carré Ambiances */}
          <div style={{
            backgroundColor: 'var(--color-purple)',
            borderRadius: '15px',
            width: '125px',
            height: '125px',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            color: 'white',
            position: 'relative',
          }}>
            <img
              src={`${ICONES_URL}/LightX2.png`}
              alt="Logo playlist"
              style={{ height: '35px', position: 'absolute', top: '10px', left: '10px' }}
            />
            <span style={{ marginTop: 'auto', marginLeft: '10px' }}>Ambiances</span>
          </div>
        </div>
      </div>
    </div>
  )

}

export default Home
