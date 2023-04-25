import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/reducers/authSlice';

const Profile = () => {
    const dispatch = useDispatch();
    const {loading, error, user} = useSelector(state => state.auth);
    
    return (
        <div>
            {loading === true ? <h1>Loading...</h1> : error !== null ? <h1>{JSON.stringify(error)}</h1> : <h1>{JSON.stringify(user)}</h1>}
        </div>
    )
}

export default Profile