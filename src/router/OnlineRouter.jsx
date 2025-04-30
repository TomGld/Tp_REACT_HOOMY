import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../screens/OnlineScreens/Home";
import ErrorPage from "../screens/ErrorScreens/ErrorPage";
import Room from "../screens/OnlineScreens/Room";
import RoomDetail from "../screens/OnlineScreens/RoomDetail";
import Vibe from "../screens/OnlineScreens/Vibe";
import VibeDetail from "../components/Card/VibeDetail";
import RoomDevice from "../screens/OnlineScreens/RoomDevice";
import Planning from "../screens/OnlineScreens/Planning";
import Playlist from "../screens/OnlineScreens/Playlist";


const OnlineRouter = createBrowserRouter([
    {
        element: <App/>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/rooms",
                element: <Room />
            },
            {
                path: "/rooms/:id",
                element: <RoomDetail />
            },
            {
                path: "/vibes",
                element: <Vibe />
            },
            {
                path: "/rooms/:id/add-device",
                element: <RoomDevice />
            },
            {
                path: "/vibes/:id",
                element: <VibeDetail />
            },
            {
                path: "/events",
                element: <Planning />
            },
            {
                path: "/playlists",
                element: <Playlist />
            }
        ]
    }
]);

export default OnlineRouter;
