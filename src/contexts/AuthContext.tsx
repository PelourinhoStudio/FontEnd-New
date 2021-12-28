import { createContext, useEffect, useState } from "react"
import { api } from '../services/api'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { useRouter } from "next/router"

type User = {
    _id: string
    email: string,
    firstName: string,
    lastName: string,
    avatar: string,
    userType: string
}

type SignInData = {
    email: string,
    password: string
}

type AuthContexType = {
    isAuthenticated: boolean,
    signIn: (data: SignInData) => Promise<void>
    user: any,
    signOut: any
}

export const AuthContext = createContext({} as AuthContexType)

export function AuthProvider({ children }: any) {

    const [user, setUser] = useState<User | null>(null)

    const isAuthenticated = !!user

    const router = useRouter()

    useEffect(() => {
        
        const { 'studio.token': token } = parseCookies()

        if (token) {
            api.get('/me', {
                headers: {
                    'x-access-token': token
                }
            }).then(response => {
                const { _id, email, firstName, lastName, avatar, userType } = response.data
                setUser({ _id, email, firstName, lastName, avatar, userType })
            })
        }
    }, [])

    async function signIn({ email, password }: SignInData) {
        try {
            const response = await api.post('/auth/login', {
                email: email,
                password: password
            })
            setCookie(undefined, 'studio.token', response.data, {
                maxAge: 60 * 60 * 1, // 1H
            })

            api.get('/me', {
                headers: {
                    'x-access-token': response.data
                }
            }).then(response => {
                const { _id, email, firstName, lastName, avatar, userType } = response.data
                setUser({ _id, email, firstName, lastName, avatar, userType })
                router.push('/')
            })
        } catch (err) {
            console.log(err)
        }
    }

    function signOut() {
        destroyCookie(undefined, 'studio.token')
        window.location.reload()
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )

}