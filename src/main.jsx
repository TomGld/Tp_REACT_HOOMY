import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import OfflineRouter from './router/OfflineRouter.jsx'
import { RouterProvider } from 'react-router-dom'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import ButtonLoader from './components/Loader/ButtonLoader.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={OfflineRouter}/>
      
    </AuthContextProvider>
  </StrictMode>,
)
