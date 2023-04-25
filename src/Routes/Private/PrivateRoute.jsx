import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
    const { user } = useSelector((state) => {
        return state.user
      })
    const location = useLocation()

    if (user) {
        return children
    }
    return <Navigate to='/' state={{ from: location }} replace />
}

export default PrivateRoute