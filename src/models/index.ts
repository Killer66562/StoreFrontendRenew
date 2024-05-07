export interface BaseSchema {
    id: number,
    created_at: number
}

export interface LoginSchema {
    username: string,
    password: string
}

export interface RegisterSchema extends LoginSchema {
    email: string,
    birthday: Date
}

export interface UserSchema extends BaseSchema, RegisterSchema {
    is_admin: boolean,
    is_banned: boolean
}

export interface TokenSchema {
    access_token: string,
    refresh_token: string
}

export interface AdminCUCitySchema {
    name: string
}

export interface CitySchema extends BaseSchema, AdminCUCitySchema {}

export interface AdminCUDistrictSchema {
    name: string,
    city_id?: number
}

export interface DistrictSchema extends BaseSchema, AdminCUDistrictSchema {
    city_id: number
}

export interface CUStoreSchema {
    name: string,
    introduction: string,
    district_id?: number
}

export interface StoreSchema extends BaseSchema, CUStoreSchema {
    district_id: number,
    icon: string | null
}

export interface CUItemSchema {
    name: string,
    introduction: string,
    price: number,
    need_18: boolean
}

export interface ItemSchema extends BaseSchema, CUItemSchema {
    store_id: number
}

export interface CUCommentSchema {
    content: string
}

export interface CommentSchema extends BaseSchema, CUCommentSchema {
    user_id: string,
    item_id: string
}