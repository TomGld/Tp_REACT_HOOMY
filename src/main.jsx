import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import OfflineRouter from './router/OfflineRouter.jsx'
import { RouterProvider } from 'react-router-dom'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import AppRouter from './router/AppRouter.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </AuthContextProvider>
  </StrictMode>,
)
