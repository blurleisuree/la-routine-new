import React from "react";
import {Link} from 'react-router-dom';

import classes from './Logo.module.css';

const Logo = () => {
    return (
        <Link to={'/'} className={classes.logoWrapper}>
            <img src="/imgs/general/logo_black.png" alt="logo" className={classes.logoImage}/>
        </Link>
    );
};

export default Logo;