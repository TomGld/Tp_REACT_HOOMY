import React from 'react'
import { PacmanLoader } from 'react-spinners'

const Playlist = () => {
return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <PacmanLoader color="#F08A4F" />
            <div style={{ marginTop: '20px' }}>Cette page est en cours de construction...</div>
            <div>Revenez plus tard.</div>
        </div>
    </div>
)
}

export default Playlist