/* eslint-disable no-unused-vars */
import React, { useEffect } from "react"
import { Link, NavLink } from "react-router-dom";
import { container, header, logoLink, linksCont, linkItem, active } from './header.module.css'
import logo from '../../images/logo_dogkipidia_40.png'

const Header = () =>{
    return(
        <header className={header}>
            <div className={container}>
                <div className={logoLink}>
                    <Link to='/'><img src={logo} alt="" /></Link>
                </div>
                <div className={linksCont}>
                    <NavLink to='/home' className={linkItem} activeClassName={active}>HOME</NavLink>
                    <NavLink to={`/breed/${Math.floor(Math.random() * 170)+ 1}`} className={linkItem} activeClassName={active}>DOG OF THE DAY</NavLink>
                    <NavLink to='/adopt' className={linkItem} activeClassName={active}>ADOPT</NavLink>
                    <NavLink to='/about' className={linkItem} activeClassName={active}>ABOUT</NavLink>
                </div>
            </div>
        </header>
    );
}

export default Header;