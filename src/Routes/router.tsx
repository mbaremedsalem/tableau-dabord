import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import PrincipalRouter from "./Principalroute"

import ErrorPage from "./ErrorPage";
import PrivateAdminLayout from "../layouts/PrivateAdminLayout";
import AuthService from "../Auth-services/AuthService";



const Router = () => {
    const routes = PrincipalRouter.map((route)=>{
        const RouteRest = route.path?.startsWith("/reset-password/:token")
        if (!AuthService.isAuthenticated() && !["/login", "/forget-password", "/reset-success", "/otp", "/success-send-email", "/success-reset-password"].includes(route.path)
        && !RouteRest) {
            return {
              ...route,
              element: <Navigate replace to="/login" />,
            };
        }   
        if(AuthService.isAuthenticated() && route.layout === "public"){
            return {
                ...route,
                element: <Navigate replace to="/" />,
              };
          }
        return {
            ...route,
            element:route.layout === "private"?(
                route.role === "admin" ? (
                    <PrivateAdminLayout> {route.element} </PrivateAdminLayout>
                ) : <ErrorPage status={"404"} message="Page not found"/>
            ) : route.element
            

            // element : route.element ? <PrivateAdminLayout>{route.element}</PrivateAdminLayout> : <ErrorPage status={"404"} message="Page not found"/>
        } 


    })
    const router = createBrowserRouter(routes); 
  return <RouterProvider router={router} />;
}

export default Router