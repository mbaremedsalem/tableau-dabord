import { lazy, Suspense } from "react"
import Spinner from "../ui/Spinner"
import ErrorPage from "./ErrorPage";


const Login = lazy(() => import("../Pages/Auth/Login"));
const ForgotPassword = lazy(() => import("../Pages/Auth/ForgotPassword"));
const ResetPassword = lazy(() => import("../Pages/Auth/ResetPassword"));
const Admin = lazy(() => import("../Pages/Admin/Admin"));
const Compte = lazy(() => import("../Pages/Comptes/Compte"));
const Guichet = lazy(() => import("../Pages/Guichet/Guichet"));
const SendLink = lazy(() => import("../Pages/Auth/SendLink"));
const SuccessResetPassword = lazy(() => import("../Pages/Auth/SuccessResetPassword"));


// const Virement = lazy(() => import("../Pages/Virement/Virement"));
const VirementInterne = lazy(() => import("../Pages/Virement/VirementInterne/VirementInterne"));
const VirementExterne = lazy(() => import("../Pages/Virement/VirementExterne/VirementExterne"));



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
        path:'/reset-password/:token',
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
      path:"/virement/interne",
      element: (
          <Suspense fallback={<Spinner center={true} />}>
            < VirementInterne/>
          </Suspense>
        ),
      layout : "private",
      role:"admin"
  },
  {
    path:"/virement/externe",
    element: (
        <Suspense fallback={<Spinner center={true} />}>
          < VirementExterne/>
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