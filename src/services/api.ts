import axios from "axios"
import { parseCookies } from "nookies"


const { 'token': token} = parseCookies()

export const api = axios.create({
    baseURL: "http://localhost:3333",
})

if(token) {
    api.defaults.headers.common['x-access-token'] =`Bearer ${token}`
}