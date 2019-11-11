import React from 'react'
import {connect} from 'react-redux'
import {compose} from "redux";
import Information from "./Information";
import {getCurrencyConverter, getInformation, getIsFetching, getCurrencyResult} from "../redux/exchanges-selectors";
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
        this.props.getCurrencyResult(id, currencySelected)
    }

    onPageChanged = (selected) => {
        this.props.getCurrencyResult(this.props.match.params.id, selected)
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
        isFetching: getIsFetching(state),
        information: getInformation(state),
        currency: getCurrencyConverter(state),
        currencyResult: getCurrencyResult(state),
        currencySelected: state.informationPage.currencySelected,
        currencyInput: state.informationPage.currencyInput,
        currencyIR: state.informationPage.currencyIR,
        marketCap: state.informationPage.marketCap
    }
}

export default compose(
    connect(mapStateToProps, {
        getInformation: requestInformation,
        getCurrencyConverter: requestInformation,
        getCurrencyResult: requestResult,
        setCurrencyInput,
        setCurrencySelected
    })) (withRouter(InformationContainer))