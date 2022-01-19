import React, { useState } from 'react';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';
import './Authentication.css';

const Authentication = () => {

    const [user,setUser] = useState(true);

    return(
        <>
            { user?<Login user={user} setUser={setUser}/>:<Register user={user} setUser={setUser}/>}
        </>
)
    
};

export default Authentication;