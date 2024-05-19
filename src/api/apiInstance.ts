import type { AxiosError, AxiosInstance, CreateAxiosDefaults } from "axios"
import axios from "axios";
import { storeToRefs } from "pinia";
import { useTokenStore } from "../stores/tokenStore";
import { baseConfig } from "./config";
import { CustomError } from "../models";

export class ApiInstance {
    private __instance: AxiosInstance;

    constructor (config: CreateAxiosDefaults = baseConfig) {
        this.__instance = axios.create(config);
        this.__instance.interceptors.request.use((request) => {
            const tokenStore = useTokenStore();
            const { accessToken, isLogin } = storeToRefs(tokenStore);
            if (isLogin.value === true)
                request.headers.Authorization = `Bearer ${accessToken.value}`;
            return request;
        });
        this.__instance.interceptors.response.use((response) => {
            return Promise.resolve(response.data);
        }, (err: AxiosError) => {
            if (!err.response)
                return Promise.reject<CustomError>({message: "發生未知錯誤，請稍後再試。", status: undefined});
            else if (err.response.status === undefined)
                return Promise.reject<CustomError>({message: "發生未知錯誤，請稍後再試。", status: undefined});
            else if (!err.response?.data)
                return Promise.reject<CustomError>({message: "發生未知錯誤，請稍後再試。", status: undefined});
            else if (err.response.status >= 500)
                return Promise.reject<CustomError>({message: "伺服端錯誤，請稍後再試。", status: err.response.status});
            else {
                const responseData = (err.response.data as any);
                if (err.response.status == 422) {
                    if (!responseData.message)
                        return Promise.reject<CustomError>({message: "送出的資料格式有誤。", status: err.response.status});
                    else
                        return Promise.reject<CustomError>({message: responseData.message, status: err.response.status});
                }
                else {
                    if (!responseData.message)
                        return Promise.reject<CustomError>({message: "客戶端錯誤，請稍後再試。", status: err.response.status});
                    else
                        return Promise.reject<CustomError>({message: responseData.message, status: err.response.status});
                }
            }          
        })
    }

    public async get<T> (url: string, params?: object) : Promise<T> {
        return await this.__instance.get(url, { params: params });
    }

    public async post<T, D> (url: string, data: D) : Promise<T> {
        return await this.__instance.post(url, data);
    }

    public async postForm<T, D> (url: string, data: D) : Promise<T> {
        return await this.__instance.postForm(url, data);
    }

    public async put<T, D> (url: string, data: D) : Promise<T> {
        return await this.__instance.put(url, data);
    }

    public async putForm<T, D> (url: string, data: D) : Promise<T> {
        return await this.__instance.putForm(url, data);
    }

    public async patch<T, D> (url: string, data: D) : Promise<T> {
        return await this.__instance.patch(url, data);
    }

    public async patchForm<T, D> (url: string, data: D) : Promise<T> {
        return await this.__instance.patchForm(url, data);
    }

    public async delete<T> (url: string) : Promise<T> {
        return await this.__instance.delete(url);
    }
}