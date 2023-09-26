import React from 'react';
import { Outlet } from 'react-router-dom';

import classes from './Main.module.css';

import Logo from '../../components/Logo/Logo.jsx';
import NavBar from '../../components/Navbar/NavBar.jsx';
import Footer from '../../components/Footer/Footer.jsx';

function Main(props) {
  
  return (
    <div className={classes.main}>
      <Logo />
      <NavBar navItems={props.navItems} />
      <Outlet context={props.navItems}/>
      <Footer />
    </div>
  );
}

export default Main;
