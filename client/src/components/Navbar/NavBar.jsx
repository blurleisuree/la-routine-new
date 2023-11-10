import React from "react";

import classes from './NavBar.module.css';

import NavItem from '../UI/NavItem/NavItem.jsx';

const NavBar = ({ navItems }) => {

    return (
        <ul className={classes.navBar}>
            <NavItem navItemData={{ name: 'new' }} />
            {navItems.map((navItem) =>
                <NavItem
                    key={navItem._id}
                    navItemData={navItem} />
            )}
            <NavItem navItemData={{ name: 'faq' }} />
        </ul>
    );
};

export default NavBar;