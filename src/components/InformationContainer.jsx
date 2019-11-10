import React from 'react'
import {connect} from 'react-redux'
import {compose} from "redux";
import Information from "./Information";
import {getCurrencyConverter, getInformation, getIsFetching, getCurrencyResult, getMarketCa} from "../redux/exchanges-selectors";
import {
    requestInformation,
    requestMarket,
    requestResult,
    setCurrencyInput,
    setCurrencySelected
} from "../redux/information-reducer";
import {withRouter} from "react-router-dom";
import s from './Information.module.css'

class InformationContainer extends React.Component {

    componentDidMount() {
        let id = this.props.match.params.id
        const {currencySelected} = this.props
        this.props.getInformation(id)
        this.props.getCurrencyConverter()
        this.props.getCurrencyResult(id, currencySelected, this.props.currencyInput)
        this.props.getMarketCa(id, currencySelected)
    }

    onPageChanged = (selected) => {
        this.props.getCurrencyResult(this.props.match.params.id, selected, this.props.currencyInput)
        this.props.getMarketCa(this.props.match.params.id, selected)
    }

    render() {

        return this.props.isFetching ? <div className={s.preloader}>Загрузка</div> :
                <Information
                    info={this.props.information}
                             currencyConverter={this.props.currency}
                             currencyInput={this.props.currencyInput}
                             setCurrencyInput={this.props.setCurrencyInput}
                             currencyResult={this.props.currencyResult}
                             setCurrencySelected={this.props.setCurrencySelected}
                             request={this.onPageChanged}
                                currencyIR={this.props.currencyIR}
                                marketCap={this.props.marketCap}
                />
    }
}

let mapStateToProps = (state) => {
    return {
        information: getInformation(state),
        isFetching: getIsFetching(state),
        currency: getCurrencyConverter(state),
        currencyInput: state.informationPage.currencyInput,
        currencyIR: state.informationPage.currencyIR,
        currencySelected: state.informationPage.currencySelected,
        currencyResult: getCurrencyResult(state),
        marketCap: getMarketCa(state)
    }
}

export default compose(
    connect(mapStateToProps, {
        getInformation: requestInformation,
        getCurrencyConverter: requestInformation,
        setCurrencyInput,
        setCurrencySelected,
        getCurrencyResult: requestResult,
        getMarketCa: requestMarket
    })) (withRouter(InformationContainer))