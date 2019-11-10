import React from 'react';
import s from './Home.module.css'
import {NavLink} from "react-router-dom";

const Home = (props) => {
    let vvv = (e) => {
        const eValue = e.target.value
        props.setCurrency(eValue)
        props.request(eValue)
    }

    return (
        <div>
            <div className={s.blockHeading}>
                <div className={s.columnHeading1}>№</div>
                <div className={s.columnHeading2}></div>
                <div className={s.columnHeading3} onClick={() => {props.name()}}>Название</div>
                <div className={s.columnHeading4} onClick={() => {props.price()}}>Стоимость ({props.currency})</div>
                <div className={s.currency}>
                    <select onChange={vvv}>
                        <option>usd</option>
                        <option>eur</option>
                        <option>rub</option>
                    </select>
                </div>
                <div className={s.columnHeading4} onClick={() => {props.price1h()}}>Изменения за 1ч</div>
                <div className={s.columnHeading4} onClick={() => {props.price24h()}}>Изменения за 1д</div>
                <div className={s.columnHeading4} onClick={() => {props.price7d()}}>Изменения за 7д</div>
            </div>
                {
                    props.cryptocurrency.map((u, index) =>
                        <NavLink to={'/information/' + u.id} className={s.navLink} key={u.id}>
                            <div className={s.blockInformation} key={u.id}>
                                <div className={s.columnInformation1}>{index+1}</div>
                                <img className={s.columnInformation2} src={u.image} alt=""/>
                                <div className={s.columnInformation3}>{u.name}</div>
                                <div className={s.columnInformation4}>{u.current_price}</div>
                                <div className={s.columnInformation4}>{u.price_change_percentage_1h_in_currency === null ? 0 :
                                    u.price_change_percentage_1h_in_currency.toFixed(2) + '%'}</div>
                                <div className={s.columnInformation4}>{u.price_change_percentage_24h_in_currency === null ? 0 :
                                    u.price_change_percentage_24h_in_currency.toFixed(2) + '%'}</div>
                                <div className={s.columnInformation4}>{u.price_change_percentage_7d_in_currency === null ? 0 :
                                    u.price_change_percentage_7d_in_currency.toFixed(2) + '%'}</div>
                                <br/>
                            </div>
                        </NavLink>)
                }
        </div>
    )
}

export default Home