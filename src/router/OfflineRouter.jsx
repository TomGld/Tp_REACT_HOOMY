import React from 'react'
import HomeOffline from '../screens/OfflineScreens/HomeOffline'
import ErrorPage from '../screens/ErrorScreens/ErrorPage'
import { createBrowserRouter } from 'react-router-dom'
import Login from '../screens/OfflineScreens/Login';

const OfflineRouter = createBrowserRouter([
    {
        element: <HomeOffline />,
        errorElement: <ErrorPage />,

        children: [
            {
                path: "/login",
                element: <Login />
            },

        ],
    }
]);

export default OfflineRouter;