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