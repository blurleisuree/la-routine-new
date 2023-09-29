import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import classes from './Main.module.css';

import Logo from '../../components/Logo/Logo.jsx';
import NavBar from '../../components/Navbar/NavBar.jsx';
import Footer from '../../components/Footer/Footer.jsx';

function Main(props) {

  const [loadAfterItem, setLoadAfterItem] = useState(useLocation().state);

  return (
    <div className={loadAfterItem ? classes.main + " " + classes.active : classes.main}>
      <Logo />
      <NavBar navItems={props.navItems} />
      <Outlet context={props.navItems} />
      <Footer />
    </div>
  );
}

export default Main;
