import { createContext, useContext, useState } from "react"
import Header from "../Components/Structure/HeaderWrapper"; // the header is imported here
import { Routes } from "react-router-dom";
import { RenderRoutes } from "../Components/Structure/navigationContents";

const AuthContext = createContext(); // allows you to spread data around without prop drilling
export const AuthData = () => useContext(AuthContext); // exported so this can be accessed elsewhere


export const AuthWrapper = () => {

     const [ user, setUser ] = useState({name: "", isAuthenticated: false})

     const login = (userName, password) => {

          // Make a call to the authentication API to check the username

          return new Promise((resolve, reject) => {
                // this is where the login from backend should be called
               if (password === "password") {
                    setUser({name: userName, isAuthenticated: true})
                    resolve("success")
               } else {
                    reject("Incorrect password")
               }
          })


     }
     const signup = (email, password, name) => {

          // Make a call to the authentication API to check the username

          return new Promise((resolve, reject) => {

               if (password === "password") {
                    setUser({name: email, isAuthenticated: true})
                    resolve("success")
               } else {
                    reject("Incorrect password")
               }
          })


     }
     const logout = () => {

          setUser({...user, isAuthenticated: false})
     }


     return (

               <AuthContext.Provider value={{user, login, logout, signup}}>
                    <>
                         <Header />
                         <RenderRoutes />


                    </>

               </AuthContext.Provider>

     )

}
