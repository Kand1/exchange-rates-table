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


export const getValutePastData = (res, id, url, n) => {
        return getPastDateData(url).then(
            (data) => {
                res.push([data.Date, data.Valute[id].Value, data.Valute[id].Previous]);
                if (n > 0) {
                    n--;
                    return  getValutePastData(res, id, data.PreviousURL, n);
                } else {
                    return res;
                }
            }
        )
}