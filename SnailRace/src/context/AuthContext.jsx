import { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie'
import {jwtDecode} from 'jwt-decode'

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
const [ user, setUser] = useState(null)
const auth = Cookies.get('token') || null;

    useEffect(() => {
        if(auth){
            try{
            const decoded = jwtDecode(auth);
            console.log("Token decodificado:", decoded)
            setUser({
                id: decoded.id,
                email: decoded.email,
                role: decoded.role
                
            });
        } catch (error) {
            console.error("Token inválido:", error);
            setUser(null);
        }
    }else {
        setUser(null);
    }
    },[]);

        const logout = () => {
        Cookies.remove('token');
        setUser(null);
        window.location.href = '/'; 
    };


        return (
        <AuthContext.Provider value={{user, setUser, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;


// import { createContext, useEffect, useState } from "react";
// import Cookies from 'js-cookie'
// import {jwtDecode} from 'jwt-decode'

// export const AuthContext = createContext();

// export const AuthContextProvider = ({children}) => {
//      const [ user, setUser] = useState(null)

//      const auth = Cookies.get('token') || null;

//     useEffect(() => {
//         if(auth){
//             const decoded = jwtDecode(auth);
//             console.log("Token decodificado:", decoded)
//             setUser({
//                 id: decoded.id,
//                 email: decoded.email,
//                 role: decoded.role
                
//             })
//         }
//     },[]);

//         const logout = () => {
//         Cookies.remove('token');
//         setUser(null);
//         window.location.href = '/'; 
//     };


//         return (
//         <AuthContext.Provider value={{user, setUser, logout}}>
//             {children}
//         </AuthContext.Provider>
//     )
// }
