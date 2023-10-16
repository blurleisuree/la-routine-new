import React from "react";
import { NavLink } from 'react-router-dom';

import classes from './NavItem.module.css';

const NavItem = ({ navItemData }) => {

    return (
        <li className={classes.navItemWrapper}>
            <NavLink className={classes.navItem}
                to={navItemData.name === 'new' ? '/' : '/' + navItemData.name}
                style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none' })}
            >
                {navItemData.name === 'magazine'
                    ? 'magazine / photo'
                    : navItemData.name
                }
            </NavLink>
        </li>
    )
};

export default NavItem;