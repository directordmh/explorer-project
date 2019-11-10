import {currencyConverterAPI, currencyResultAPI, informationAPI} from "../api/api";

const INFORMATION_TEST = 'INFORMATION_TEST'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const CURRENCY_CONVERTER = 'CURRENCY_CONVERTER'
const CURRENCY_INPUT = 'CURRENCY_INPUT'
const CURRENCY_RESULT = 'CURRENCY_RESULT'
const CURRENCY_SELECTED = 'CURRENCY_SELECTED'


let initialState = {
        information: {},
        isFetching: false,
        currency: [],
        currencySelected: 'usd',
        currencyInput: 1,
        currencyResult: '',
        currencyIR: ''
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
        return {
            ...state,
            currencyInput: action.currencyInput,
            currencyIR: action.currencyInput * action.currencyResult
        }
        case CURRENCY_RESULT:
        return {
            ...state,
            currencyResult: action.data.currencyResult,
            currencyIR: action.data.currencyInput * action.data.currencyResult
        }
        case CURRENCY_SELECTED:
        return {
            ...state,
            currencySelected: action.currencySelected
        }
        default:
            return state
    }
}

export const setInformation = (test) => ({type: INFORMATION_TEST, test})
export const setIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const setCurrencyConverter = (currency) => ({type: CURRENCY_CONVERTER, currency})
export const setCurrencyInput = (currencyInput, currencyResult) => ({type: CURRENCY_INPUT, currencyInput, currencyResult})
export const setCurrencyResult = (data) => ({type: CURRENCY_RESULT, data})
export const setCurrencySelected = (currencySelected) => ({type: CURRENCY_SELECTED, currencySelected})
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

export const requestResult = (id, selected, currencyInput) => {
    return (dispatch) => {
        currencyResultAPI.getCurrencyResult(id, selected, currencyInput).then(data => {
            dispatch(setCurrencyResult(data))
        })
    }
}

export default informationReducer