export const getStaticFile = (path: string) : string => {
    return import.meta.env.VITE_API_URL + "/static/" + path;
}

export const getErrorMessage = (err: any) : string => {
    if (err.status === undefined)
        return "發生未知錯誤，請稍後再試。";
    else if (!err.message)
        return "發生未知錯誤，請稍後再試。";
    else
        return err.message;
}

export const getOrderStatusText = (orderStatus: number) : string => {
    switch (orderStatus) {
        case 1: return "賣家確認中"
        case 2: return "賣家已出貨"
        case 3: return "商品運送中"
        case 4: return "商品已到達"
        case 5: return "訂單已完成"
        case 6: return "訂單已取消"
        
        default: return "未知";
    }
}