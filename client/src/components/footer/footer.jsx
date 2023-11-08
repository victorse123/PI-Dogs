import React from "react";
import { Link } from "react-router-dom";
import { footerLine, footerText, footerCont, linkStyle } from './footer.module.css'

const Footer = () =>{
    return(
        <footer className={footerCont}>
            <hr className={footerLine} />
            <p className={footerText}>© 2022 Dogkipidia. Made with love by <Link to='/about' className={linkStyle}>Chris Luna</Link>.</p>
        </footer>
    );
}

export default Footer;