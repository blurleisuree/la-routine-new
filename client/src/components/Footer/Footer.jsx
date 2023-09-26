import React from "react";
import { Link } from 'react-router-dom';

import classes from './Footer.module.css';

const Footer = () => {
    return (
        <div className={classes.footer}>
            <Link to={'/'} className={classes.footerClown}>
                <img src="/imgs/general/clown.png" alt="clown" />
            </Link>
            <h1 className={classes.footerTitle}>© 2023 La Routine Magazine</h1>
            <ul className={classes.footerLinks}>
                <li className={classes.footerLink}>
                    <a href=""><img src='/imgs/icons/vk.svg'></img></a>
                </li>
                <li className={classes.footerLink}>
                    <a href=""><img src='/imgs/icons/inst.svg'></img></a>
                </li>
                <li className={classes.footerLink}>
                    <a href=""><img src='/imgs/icons/youtube.svg'></img></a>
                </li>
                <li className={classes.footerLink}>
                    <a href=""><img src='/imgs/icons/soundcloud.svg'></img></a>
                </li>
                <li className={classes.footerLink}>
                    <a href=""><img src='/imgs/icons/tg.svg'></img></a>
                </li>
            </ul>
        </div>
    );
};

export default Footer;