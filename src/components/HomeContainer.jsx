import React from 'react'
import {connect} from 'react-redux'
import {compose} from "redux";
import Home from "./Home";
import {getExchanges} from "../redux/exchanges-selectors";
import {
    requestExchanges,
    setPriceSort,
    setNameSort,
    setPrice1h,
    setPrice24h,
    setPrice7d,
    setCurrency
} from "../redux/home-reducer";

class HomeContainer extends React.Component {
    componentDidMount() {
        this.props.getExchanges(this.props.currency)
    }

    onPageChanged = (currency) => {
        this.props.getExchanges(currency)
    }

    render() {
        return <>
            <Home cryptocurrency={this.props.cryptocurrency} price={this.props.setPriceSort}
                  price1h={this.props.setPrice1h} price24h={this.props.setPrice24h} price7d={this.props.setPrice7d}
                  name={this.props.setNameSort} setCurrency={this.props.setCurrency} request={this.onPageChanged}
                  currency={this.props.currency}
            />
        </>
    }

}

let mapStateToProps = (state) => {
    return {
        cryptocurrency: getExchanges(state),
        currency: state.homePage.currency
    }
}

export default compose(
    connect(mapStateToProps, {
        getExchanges: requestExchanges,
        setPriceSort,
        setNameSort,
        setPrice1h,
        setPrice24h,
        setPrice7d,
        setCurrency
    })) (HomeContainer)