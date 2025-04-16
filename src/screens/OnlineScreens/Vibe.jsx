import React, { useEffect } from 'react'
import VibeSmall from '../../components/Card/VibeSmall'
import { fetchVibes } from '../../store/vibe/vibeSlice';
import { useDispatch, useSelector } from 'react-redux';
import selectVibeData from '../../store/vibe/vibeSelector';

const Vibe = () => {
    const dispatch = useDispatch();

    //Récupération des vibes existantes par le fetch

    useEffect(() => {
        dispatch(fetchVibes());
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