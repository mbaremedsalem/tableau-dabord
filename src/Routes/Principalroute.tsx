import { lazy, Suspense } from "react"
import Spinner from "../ui/Spinner"
import ErrorPage from "./ErrorPage";


const Login = lazy(() => import("../Pages/Auth/Login"));
const ForgotPassword = lazy(() => import("../Pages/Auth/ForgotPassword"));
const ResetPassword = lazy(() => import("../Pages/Auth/ResetPassword"));
const Admin = lazy(() => import("../Pages/Admin"));
const Compte = lazy(() => import("../Pages/Compte"));
const Guichet = lazy(() => import("../Pages/Guichet"));
const Virement = lazy(() => import("../Pages/Virement"));
const SendLink = lazy(() => import("../Pages/Auth/SendLink"));
const SuccessResetPassword = lazy(() => import("../Pages/Auth/SuccessResetPassword"));





var PrincipalRouter = [
    
    {
        path:"/login",
        element: (
            <Suspense fallback={<Spinner center={true} />}>
              < Login/>
            </Suspense>
          ),
        layout : "public",
        role:"admin"
    },
    {
        path:"/forget-password",
        element: (
            <Suspense fallback={<Spinner center={true} />}>
              < ForgotPassword/>
            </Suspense>
          ),
        layout : "public",
        role:"admin"
    },
    {
        path:'/reset-password',
        element: (
            <Suspense fallback={<Spinner center={true} />}>
              < ResetPassword/>
            </Suspense>
          ),
          layout:'public',
          role : "admin"
    },
    {
        path:'/success-send-email',
        element: (
            <Suspense fallback={<Spinner center={true} />}>
              < SendLink/>
            </Suspense>
          ),
          layout:'public',
          role : "admin"
    },
    {
        path:'/success-reset-password',
        element: (
            <Suspense fallback={<Spinner center={true} />}>
              < SuccessResetPassword/>
            </Suspense>
          ),
          layout:'public',
          role : "admin"
    },

    {
        path:"/",
        element: (
            <Suspense fallback={<Spinner center={true} />}>
              < Admin/>
            </Suspense>
          ),
        layout : "private",
        role:"admin"
    },
    {
        path:"/comptes",
        element: (
            <Suspense fallback={<Spinner center={true} />}>
              < Compte/>
            </Suspense>
          ),
        layout : "private",
        role:"admin"
    },
    
    {
        path:"/guichet",
        element: (
            <Suspense fallback={<Spinner center={true} />}>
              < Guichet/>
            </Suspense>
          ),
        layout : "private",
        role:"admin"
    },
    {
        path:"/virement",
        element: (
            <Suspense fallback={<Spinner center={true} />}>
              < Virement/>
            </Suspense>
          ),
        layout : "private",
        role:"admin"
    },
    {
        path: "*",
        element: <ErrorPage status={"404"} message="Page not found" />,
        layout: "private",
        role: "",
      },
]


export default PrincipalRouter