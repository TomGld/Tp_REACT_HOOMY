import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchVibe } from '../../store/Vibe/vibeSlice';
import selectVibeData from '../../store/Vibe/vibeSelector';
import PageLoader from '../Loader/PageLoader';
import { ICONES_URL, LOGOS_URL } from '../../constants/apiConstant';

const VibeSmall = () => {
  const dispatch = useDispatch();


  //Récupération des vibes existantes par le fetch

      useEffect(() => {
        dispatch(fetchVibe());
      }, [dispatch])

  const { loading, vibe } = useSelector(selectVibeData);
  console.log("dataVibes", vibe);

  return (
    <div>
      {loading ? <PageLoader /> : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {vibe.map((v, index) => (
            <div key={index} style={{
              width: '120px',
              height: '150px',
              backgroundColor: '#e5dfdb',
              borderRadius: '70px 70px 20px 20px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingBottom: '15px',
              fontFamily: 'sans-serif',
              margin: '3px'
            }}>
              <div style={{
                position: 'absolute',
                top: '20px',
                width: '70px',
                height: '70px',
                backgroundColor: 'white',
                borderRadius: '50%',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src={v.image?.imagePath ? `${ICONES_URL}/${v.image.imagePath}` : `${LOGOS_URL}/logoSmallX2.png`} 
                  alt={v.label || 'Vibe'} 
                  style={{ width: '80%', height: '80%', objectFit: 'cover' }} 
                />
              </div>
              <span style={{
                color: '#1c1c3c',
                fontSize: '16px',
                fontWeight: 'bold',
                zIndex: 1,
                textAlign: 'center'
              }}>
                {v.label || 'Inconnu'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default VibeSmall