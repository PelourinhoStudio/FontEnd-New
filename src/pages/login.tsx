import type { NextPage } from 'next'
import Router from 'next/router'
import { useContext, useEffect } from 'react'
import { LoginPage } from '../components/loginPage/loginPage'
import { AuthContext } from '../contexts/AuthContext'

const Login: NextPage = () => {

    const { isAuthenticated } = useContext(AuthContext)

    useEffect(() => {
        if(isAuthenticated) {
            Router.push('/')
        }
    }, [])

    return (
        <LoginPage />
    )
}

export default Login