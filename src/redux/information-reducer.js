import {currencyConverterAPI, currencyResultAPI, informationAPI, marketCapAPI} from "../api/api";

const INFORMATION_TEST = 'INFORMATION_TEST'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const CURRENCY_CONVERTER = 'CURRENCY_CONVERTER'
const CURRENCY_INPUT = 'CURRENCY_INPUT'
const CURRENCY_RESULT = 'CURRENCY_RESULT'
const CURRENCY_SELECTED = 'CURRENCY_SELECTED'
const MARKET_CAP = 'MARKET_CAP'

let initialState = {
        information: {},
        isFetching: false,
        currency: [],
        currencySelected: 'usd',
        currencyInput: 1,
        currencyResult: '',
        currencyIR: '',
        marketCap: ''
}

const informationReducer = (state = initialState, action) => {
    switch (action.type) {
        case INFORMATION_TEST:
            return {
                ...state,
                information: action.test
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case CURRENCY_CONVERTER:
            return {
                ...state,
                currency: action.currency
            }
        case CURRENCY_INPUT:
            let sum = action.currencyInput * state.currencyResult
        return {
            ...state,
            currencyInput: action.currencyInput,
            currencyIR: sum
        }
        case CURRENCY_RESULT:
            let sum2 = action.currencyResult * state.currencyInput
        return {
            ...state,
            currencyResult: action.currencyResult,
            currencyIR: sum2
        }
        case CURRENCY_SELECTED:
        return {
            ...state,
            currencySelected: action.currencySelected
        }
        case MARKET_CAP:
            return {
                ...state,
                marketCap: action.marketCap
            }
        default:
            return state
    }
}

export const setInformation = (test) => ({type: INFORMATION_TEST, test})
export const setIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const setCurrencyConverter = (currency) => ({type: CURRENCY_CONVERTER, currency})
export const setCurrencyInput = (currencyInput) => ({type: CURRENCY_INPUT, currencyInput})
export const setCurrencyResult = (currencyResult) => ({type: CURRENCY_RESULT, currencyResult})
export const setCurrencySelected = (currencySelected) => ({type: CURRENCY_SELECTED, currencySelected})
export const setMarketCap = (marketCap) => ({type: MARKET_CAP, marketCap})
export const requestInformation = (id) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        let data = await informationAPI.getInformation(id);
            dispatch(setInformation(data))
            dispatch(setIsFetching(false))

        let response = await currencyConverterAPI.getCurrencyConverter()
            dispatch(setCurrencyConverter(response))
    }
}

export const requestResult = (id, selected) => {
    return async (dispatch) => {
        let data = await currencyResultAPI.getCurrencyResult(id, selected)
            dispatch(setCurrencyResult(data))
        let response = await marketCapAPI.getMarketCa(id, selected)
        dispatch(setMarketCap(response))
    }
}

export default informationReducer