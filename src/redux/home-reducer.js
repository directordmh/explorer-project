import {exchangesAPI} from "../api/api";

const HOME_TEST = 'HOME_TEST'
const PRICE_SORT = 'PRICE_SORT'
const NAME_SORT = 'NAME_SORT'
const PRICE_1H = 'PRICE_1H'
const PRICE_24H = 'PRICE_24H'
const PRICE_7D = 'PRICE_7D'
const CURRENCY = 'CURRENCY'

let initialState = {
    cryptocurrency:[],
    priceSort: false,
    nameSort: false,
    price1h: false,
    price24h: false,
    price7d: false,
    currency: 'usd'
}

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case HOME_TEST:
            return {
                ...state,
                cryptocurrency: action.cryptocurrency
            }
        case PRICE_SORT:
            let s = state.cryptocurrency.map(u => u)
            state.priceSort ? s.sort((a, b) => a.current_price - b.current_price)
             : s.sort((a, b) => b.current_price - a.current_price)
            return  {
                ...state,
                priceSort: state.priceSort ? false : true,
                cryptocurrency: s
            }
        case PRICE_1H:
            let p1h = state.cryptocurrency.map(u => u)
            state.price1h ? p1h.sort((a, b) => a.price_change_percentage_1h_in_currency - b.price_change_percentage_1h_in_currency)
                : p1h.sort((a, b) => b.price_change_percentage_1h_in_currency - a.price_change_percentage_1h_in_currency)
            return  {
                ...state,
                price1h: state.price1h ? false : true,
                cryptocurrency: p1h
            }
        case PRICE_24H:
            let p24h = state.cryptocurrency.map(u => u)
            state.price24h ? p24h.sort((a, b) => a.price_change_percentage_24h_in_currency - b.price_change_percentage_24h_in_currency)
                : p24h.sort((a, b) => b.price_change_percentage_24h_in_currency - a.price_change_percentage_24h_in_currency)
            return  {
                ...state,
                price24h: state.price1h ? false : true,
                cryptocurrency: p24h
            }
        case PRICE_7D:
            let p7d = state.cryptocurrency.map(u => u)
            state.price7d ? p7d.sort((a, b) => a.price_change_percentage_7d_in_currency - b.price_change_percentage_7d_in_currency)
                : p7d.sort((a, b) => b.price_change_percentage_7d_in_currency - a.price_change_percentage_7d_in_currency)
            return  {
                ...state,
                price7d: state.price7d ? false : true,
                cryptocurrency: p7d
            }
        case NAME_SORT:
            let ns = state.cryptocurrency.map(u => u)
            state.nameSort ? ns.sort((a, b) => b.name > a.name)
                : ns.sort((a, b) => b.name < a.name)
            return  {
                ...state,
                nameSort: state.nameSort ? false : true,
                cryptocurrency: ns
            }
        case CURRENCY:
            return  {
                ...state,
                currency: action.currency
            }
        default:
            return state
    }
}

export const setExchanges = (cryptocurrency) => ({type: HOME_TEST, cryptocurrency})
export const setPriceSort = () => ({type: PRICE_SORT})
export const setPrice1h = () => ({type: PRICE_1H})
export const setPrice24h = () => ({type: PRICE_24H})
export const setPrice7d = () => ({type: PRICE_7D})
export const setNameSort = () => ({type: NAME_SORT})
export const setCurrency = (currency) => ({type: CURRENCY, currency})
export const requestExchanges = (currency) => {
    return (dispatch) => {
        exchangesAPI.getExchanges(currency).then(data => {
            dispatch(setExchanges(data))
        })
    }
}

export default homeReducer