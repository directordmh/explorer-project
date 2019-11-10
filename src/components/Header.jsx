import React from 'react';
import s from './Header.module.css'
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <div className={s.header}>
            <p>Explorer криптовалют</p>
            <div className={s.blockNavLink}>
                <NavLink to={'/home'} className={s.navLink}>Главная</NavLink>
            </div>
        </div>
    )
}

export default Header