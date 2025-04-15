import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../screens/OnlineScreens/Home";
import ErrorPage from "../screens/ErrorScreens/ErrorPage";
import Room from "../screens/OnlineScreens/Room";
import Vibe from "../screens/OnlineScreens/Vibe";


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
                path: "/vibes",
                element: <Vibe />
            },
           
        ]
    }
]);

export default OnlineRouter;
