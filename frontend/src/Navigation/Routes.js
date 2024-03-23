import Landing from "../Components/Pages/Landing"
import Dashboard from "../Components/Pages/Dashboard"
import Blocks from "../Components/Pages/Blocks"
import Task from "../Components/Pages/Task"
import Dump from "../Components/Pages/Dump"
import SignIn from "../Components/Modals/SignIn"
import SignUp from "../Components/Modals/SignUp"
import Selfie from "../Components/Modals/Selfie"
import { AuthData } from "../Auth/AuthWrapper"
import { Routes, Route } from "react-router-dom"
import ErrorPage from "../Components/Pages/ErrorPage"

// Placing the elements that need routes in an array like this makes it easy to change on the fly
const logoImage = <img className="headerLogo" src="./logo.png" alt="logo" />

export const nav = [
    { path:  null,         name: "Login",   element: <SignIn />,    isModal: true,     isPrivate: false },
    { path:  "/",         name: logoImage,   element: <Landing />,    isModal: false,     isPrivate: false },
    { path:  null,         name: "SignUp",   element: <SignUp/>,    isModal: true,     isPrivate: false },
    { path:  "/blocks",   name: "Blocks",    element: <Blocks />,     isModal: false,     isPrivate: true  },
    { path:  "/task",     name: "Task",      element: <Task />,       isModal: false,    isPrivate: true  },
    { path:  "/dash",     name:logoImage, element: <Dashboard />,  isModal: false,     isPrivate: true  },
    { path:  "/dump",     name: "Dump",      element: <Dump />,       isModal: false,     isPrivate: true  },
    { path:  null,         name: "Selfie",   element: <Selfie />,    isModal: true,     isPrivate: true},
]

const DynamicRouter = () => {
    // This is to dynamically generate routes for pages that need them. It only happens when a user is logged in to make the site more secure. NonUsers cant accidently make it to a route that doesnt exist
    const { user } = AuthData();

    return (
        <Routes>
        {nav.map((r, i) => {
          if ((r.isPrivate && user.isAuthenticated) || !r.isPrivate) {
            return <Route key={i} path={r.path} element={r.element} />;
          }
          return null; // Don't render a route if it shouldn't be displayed
        })}
        <Route path="*" element={<ErrorPage />} /> {/* Catch-all route */}
      </Routes>

    )
}
export default DynamicRouter
