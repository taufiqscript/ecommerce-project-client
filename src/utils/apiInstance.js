import { emailstorageAtom, tokenStorageAtom } from "@/jotai/atoms";
import axios from "axios";
import { getDefaultStore } from 'jotai'

export const apiInstance = axios.create(
    {
        baseURL: import.meta.env.VITE_BASE_URL_FAKESTORE,
        headers: {
            "Content-Type": "application/json"
        }
    }
)

const store = getDefaultStore()

export const apiInstanceExpress = axios.create(
    {
        baseURL: import.meta.env.VITE_BASE_URL_EXPRESS || import.meta.env.VITE_API_URL,
        headers: {
            "Content-Type": "application/json"
        }
    }
)

apiInstanceExpress.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status
        if (status === 401) {
            store.set(tokenStorageAtom, null)
            store.set(emailstorageAtom, null)
            location.replace('/login')
        }
        return Promise.reject(error)
    }
)