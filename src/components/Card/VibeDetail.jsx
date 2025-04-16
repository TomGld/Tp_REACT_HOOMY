import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import selectVibeData from '../../store/vibe/vibeSelector';
import { fetchVibeDetail } from '../../store/vibe/vibeSlice';
import VibeSmall from './VibeSmall';
import { Link, useParams } from 'react-router-dom';
import PageLoader from '../Loader/PageLoader';
import VibeForm from './VibeForm';

const VibeDetail = () => {
    const dispatch = useDispatch();
    const param = useParams();
    const { id } = param;


    //Récupération de la vibe dans le store
    const { loading, vibeDetail } = useSelector(selectVibeData);


    //Récupération des vibes existantes par le fetch
    
        useEffect(() => {
            dispatch(fetchVibeDetail(id));
        }, [dispatch, id])
    

  return (
      loading ? <PageLoader /> : 
        <>
          <VibeForm vibe={vibeDetail} />


        </>
      
  )
}

export default VibeDetail