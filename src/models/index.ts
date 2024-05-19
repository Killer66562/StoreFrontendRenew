export interface BaseSchema {
    id: number,
    created_at: Date
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
    district_id?: number,
    icon: File | null
}

export interface StoreSchema extends BaseSchema {
    name: string,
    introduction: string,
    district_id: number,
    icon: string | null
}

export interface CUItemSchema {
    name: string,
    introduction: string,
    count: number,
    price: number,
    need_18: boolean,
    icon: File | null
}

export interface ItemSchema extends BaseSchema {
    store_id: number,
    name: string,
    introduction: string,
    count: number,
    price: number,
    need_18: boolean,
    icon: string | null
}

export interface CUCommentSchema {
    content: string
}

export interface CommentSchema extends BaseSchema, CUCommentSchema {
    user_id: string,
    item_id: string
}

export interface FullCommentSchema extends CommentSchema {
    user: UserSchema
}

export interface PageSchema<T> {
    items: T[],
    page: number,
    pages: number,
    size: number
}

export interface FullDistrictSchema extends DistrictSchema {
    city: CitySchema
}

export interface CULikedItemSchema {
    item_id: number
}

export interface CUCartItemSchema extends CULikedItemSchema {
    count: number
}

export interface LikedItemSchema extends BaseSchema, CULikedItemSchema {}

export interface FullLikedItemSchema extends LikedItemSchema {
    item: ItemSchema
}

export interface FullStoreSchema extends StoreSchema {
    owner: UserSchema
}

export interface CUItemImageSchema {
    image: File
}

export interface ItemImageSchema extends BaseSchema {
    item_id: number
    path: string
}

export interface FullItemSchema extends ItemSchema {
    store: StoreSchema,
    images: ItemImageSchema[],
    comments: FullCommentSchema[]
}

export interface CustomError {
    message: string,
    status?: number
}

export interface OrderSchema {
    item: ItemSchema,
    id: number,
    created_at: Date,
    item_id: number,
    user_id: number,
    count: number
} 