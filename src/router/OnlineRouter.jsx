import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../screens/OnlineScreens/Home";
import ErrorPage from "../screens/ErrorScreens/ErrorPage";
import Room from "../screens/OnlineScreens/Room";


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
           
        ]
    }
]);

export default OnlineRouter;
