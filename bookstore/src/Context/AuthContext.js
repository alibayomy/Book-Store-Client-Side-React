import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React, { createContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'


export const AuthContext = React.createContext()

export const AuthProvider = ({children}) => {

    const [authTokens, setAuthTokens] = useState(() => 
        localStorage.getItem("authTokens")
        ? JSON.parse(localStorage.getItem("authTokens"))
        : null
    )

    const [user, setUser] = useState(() => 
        localStorage.getItem("authTokens")
            ? jwtDecode(JSON.parse(localStorage.getItem("authTokens")).access)
            : null
    )
    
    const [loading, setLoading] = useState(true)
    const history = useHistory()

    // const loginUser = async (username, password) => {
    //     let history = useHistory()
    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }
    //     const body = JSON.stringify({username, password})
    //     axios.post('http://127.0.0.1:8000/api/token/', body, config)
    //     .then(response => {
    //         console.log("Log In")
    //         setAuthTokens(response.data)
    //         setUser(jwtDecode(response.data.access))
    //         localStorage.setItem("authTokens", JSON.stringify(response.data))
    //         history.push('/')
        
    //     }).catch(err => {
    //         console.log(err, err.status)
    //         alert("Something went wrong")
    //     })
        
    // }

//   const registerUser = (first_name, last_name, email, password, password2) => {
    
//     body = {}
//   }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        // history.push('/login')
    }

    const contextData = {
        user,
        authTokens,
        loading,
        setAuthTokens,
        // loginUser,
        setLoading,
        setUser,
        logoutUser
    }

    useEffect(() => {
        if(authTokens){
            setUser(jwtDecode(authTokens.access))
        }
        setLoading(false)
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}

