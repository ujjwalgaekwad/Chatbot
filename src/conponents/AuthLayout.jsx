import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

function AuthLayout({ children, authentication = true }) {
    const [Loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const userStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        if (authentication && userStatus !== authentication) {
            navigate("/login")
        } else if (!authentication && userStatus !== authentication) {
            navigate("/")
        }
        setLoading(false)
    }, [authentication, navigate, userStatus]);
    return Loading ? <h1>Loading....</h1> : <>{children}</>
}

export default AuthLayout
