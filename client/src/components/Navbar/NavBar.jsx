import React from "react";

import classes from './NavBar.module.css';

import NavItem from '../UI/NavItem/NavItem.jsx';

const NavBar = (props) => {

    return (
        <ul className={classes.navBar}>
            <NavItem name={'new'}/>
            {props.navItems.map((navItem) =>
                <NavItem name={navItem} />
            )}
        </ul>
    );
};

export default NavBar;