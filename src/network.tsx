import axios from "axios";

const HEADERS = {
    "x-access-token": "skip_validation_for_admin",
    "Content-Type": "application/json"
}

export const post = async (url: string, data: any) => {
    return await axios.post(
        url,
        data,
        { headers: HEADERS }
    );
}

export const put = async (url: string, data: any) => {
    return await axios.put(
        url,
        data,
        { headers: HEADERS }
    );
}

export const get = async (url: string) => {
    return await axios.get(
        url,
        { headers: HEADERS }
    );
}