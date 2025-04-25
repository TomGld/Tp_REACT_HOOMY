import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../screens/OnlineScreens/Home";
import ErrorPage from "../screens/ErrorScreens/ErrorPage";
import Room from "../screens/OnlineScreens/Room";
import RoomDetail from "../screens/OnlineScreens/RoomDetail";
import RoomDevice from "../screens/OnlineScreens/RoomDevice";
import Planning from "../screens/OnlineScreens/Planning";


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
                path: "/rooms/:id/add-device",
                element: <RoomDevice />
            },
            {
                path : "/events",
                element : <Planning />
            }
           
        ]
    }
]);

export default OnlineRouter;
