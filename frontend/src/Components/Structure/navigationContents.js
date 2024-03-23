import Landing from "../Pages/Landing"
import Dashboard from "../Pages/Dashboard"
import Blocks from "../Pages/Blocks"
import Task from "../Pages/Task"
import Dump from "../Pages/Dump"
import { AuthData } from "../../Auth/AuthWrapper"
import { Routes, Route } from "react-router-dom"

// Placing the elements that need routes in an array like this makes it easy to change on the fly
export const nav = [
     { path:  "/",         name: "Landing",   element: <Landing />,    isMenu: true,     isPrivate: false },
     { path:  "/dash",     name: "Dashboard", element: <Dashboard />,  isMenu: true,     isPrivate: true  },
     { path:  "/blocks",   name: "Blocks",    element: <Blocks />,     isMenu: true,     isPrivate: true  },
     { path:  "/task",     name: "Task",      element: <Task />,       isMenu: false,    isPrivate: true  },
     { path:  "/dump",     name: "Dump",      element: <Dump />,       isMenu: true,     isPrivate: true  }
]

export const RenderRoutes = () => {

    const { user } = AuthData();

    return (
         <Routes>
         { nav.map((r, i) => {

              if (r.isPrivate && user.isAuthenticated) { // if its private and the user is logged in display
                   return <Route key={i} path={r.path} element={r.element}/>
              } else if (!r.isPrivate) { // if its not private display
                   return <Route key={i} path={r.path} element={r.element}/>
              } else return false
         })}

         </Routes>
    )
}
