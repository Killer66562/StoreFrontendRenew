export const getStaticFile = (path: string) : string => {
    return import.meta.env.VITE_API_URL + "/static/" + path;
}