import { CreateAxiosDefaults } from "axios"


export const baseConfig: CreateAxiosDefaults = {
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000
}