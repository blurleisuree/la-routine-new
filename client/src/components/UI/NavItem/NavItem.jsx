import React from "react";
import {NavLink} from 'react-router-dom';

import classes from './NavItem.module.css';

const NavItem = (props) => {

    return (
        <li className={classes.navItemWrapper}>
            <NavLink className={classes.navItem}
                to={props.name == 't-shirt' ? '/' : '/' + props.name}
                style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none' })}
            >
                {props.name}
            </NavLink>
        </li>
    )
};

export default NavItem;