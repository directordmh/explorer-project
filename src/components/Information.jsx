import React from 'react';
import s from './Information.module.css'

const Information = (props) => {

    let change = (e) => {
        const etv = e.target.value
        if (!isFinite(etv) || etv.substr(-1) === ' ') return
        props.setCurrencyInput(etv, props.currencyResult)
    }

    let select = (e) => {
        const etv = e.target.value
        props.setCurrencySelected(etv)
        props.request(etv)
    }

    return (
        <div className={s.block}>
            <p className={s.title}>{props.info.name}</p>
            <img src={props.info.image} alt="" className={s.image}/>
            <div><a href={props.info.links}>{props.info.links}</a></div>
            <div>Дата создания {props.info.genesis_date}</div>

            <div className={s.converter}><p className={s.p}>{props.info.symbol}</p>
                <input type="text" className={s.input} onChange={change} value={props.currencyInput} />
                <div className={s.input}>{props.currencyIR}</div>
                <select className={s.select} onChange={select}>
                    {props.currencyConverter.map((u, index) =>
                        u === 'usd' ? <option selected='selected' key={index}>{u}</option> : <option key={index}>{u}</option>
                    )}
                </select>
            </div>
        </div>
    )

}

export default Information