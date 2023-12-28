import React from 'react';

import { Navigate } from 'react-router-dom';

export default function LogoutPage(props)
{
    const storageUser = localStorage.getItem('user');
    if (storageUser)
    {
        localStorage.removeItem('user');
    }

    
    return <Navigate to={"/login"} replace={true} />
}