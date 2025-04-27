import React, { useEffect } from 'react'
import VibeSmall from '../../components/Card/VibeSmall'
import { useDispatch, useSelector } from 'react-redux';
import { fetchVibe } from '../../store/Vibe/vibeSlice';
import selectVibeData from '../../store/Vibe/vibeSelector';


const Vibe = () => {
    const dispatch = useDispatch();

    //Récupération des vibes existantes par le fetch

    useEffect(() => {
        dispatch(fetchVibe());
    }, [dispatch])

    const { loading, vibes } = useSelector(selectVibeData);
    console.log("dataVibes", vibes);

return (
    <div style={{ paddingLeft: '20px', paddingRight: '20px', marginTop: '20px' }}>
        <h1>Vos ambiances :</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {vibes.map((vibe, index) => (
                <VibeSmall vibe={vibe} key={index} />
            ))}
        </div>
    </div>
)
}

export default Vibe