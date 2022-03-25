import axios from "axios";

const instance = axios.create({
    baseURL: "https://www.cbr-xml-daily.ru/"
})

export const getCurrentDateData = () => {
    return instance.get("/daily_json.js")
        .then(response => response.data)
}

export const getPastDateData = (url) => {
    return axios.get(url)
        .then(response => response.data)
}