import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import SignUp from "../pages/auth/SignUp";
import SignIn from "../pages/auth/SignIn";
import DashboardLayout from "../layouts/DashBoardLayout";
import CampaignsPage from "../pages/dashboard/Campaign";
import App from "../pages/App";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
     
    },
    {
        path:"/auth",
        element:<AuthLayout/>,
        children:[{
            path:"signup",
            element:<SignUp/>

        },{
            path:"signin",
            element:<SignIn/>
        }
    
    ]

    }
    ,{
        path:"/dashboard/",
        element:<DashboardLayout/>,
        children:[{
            path:"campaign",
            element:<CampaignsPage/>
        }]
    }
])