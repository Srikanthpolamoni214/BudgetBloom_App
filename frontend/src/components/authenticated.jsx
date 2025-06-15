import React from 'react'
import { Navigate } from 'react-router-dom';

const AuthenticatedRoute = ({children}) => {
//   const token = ;
    if(localStorage.getItem('token')){

        return children;
    }
    else{
        return <Navigate to={"/"}/>
    }
}

export default AuthenticatedRoute