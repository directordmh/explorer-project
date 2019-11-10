import * as axios from 'axios'

const instance = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3/',
})

export const exchangesAPI = {
    getExchanges(currency) {
        return instance.get(`coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=150&sparkline=false&price_change_percentage=1h%2C24h%2C7d`)
            .then(response => {
                return response.data
            })
    }
}

export const informationAPI = {
    getInformation(id) {
        return instance.get(`coins/${id}?tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`)
            .then(response => {
                return {name: response.data.name,
                        genesis_date: response.data.genesis_date,
                        symbol: response.data.symbol,
                        image: response.data.image.small,
                        links: response.data.links.homepage[0]}
            })
    }
}

export const currencyConverterAPI = {
    getCurrencyConverter() {
        return instance.get(`simple/supported_vs_currencies`)
            .then(response => {
                return response.data
            })
    }
}

export const currencyResultAPI = {
    getCurrencyResult(id, selected, currencyInput) {
        return instance.get(`simple/price?ids=${id}&vs_currencies=${selected}`)
            .then(response => {
                return {currencyResult: response.data[id][selected],
                        currencyInput: currencyInput}
            })
    }
}
