import {createSelector} from "reselect";

const getExchangesSelector = (state) => {
    return state.homePage.cryptocurrency;
}

export const getExchanges = createSelector(getExchangesSelector,
    (cryptocurrency) => {
        return cryptocurrency
    })

const getInformationSelector = (state) => {
    return state.informationPage.information;
}

export const getInformation = createSelector(getInformationSelector,
    (information) => {
        return information
    })

export const getIsFetching = (state) => {
    return state.informationPage.isFetching;
}

const getCurrencyConverterSelector = (state) => {
    return state.informationPage.currency;
}

export const getCurrencyConverter = createSelector(getCurrencyConverterSelector,
    (currency) => {
        return currency
    })

const getCurrencyResultSelector = (state) => {
    return state.informationPage.currencyResult;
}

export const getCurrencyResult = createSelector(getCurrencyResultSelector,
    (currencyResult) => {
        return currencyResult
    })
