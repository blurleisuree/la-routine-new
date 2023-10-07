import React, { useMemo, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import classes from './Main.module.css';

import Logo from '../../components/Logo/Logo.jsx';
import NavBar from '../../components/Navbar/NavBar.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import Basket from '../../components/Basket/Basket.jsx';
import BasketButton from '../../components/UI/BasketButton/BasketButton.jsx';

function Main({ navItems, basket }) {

  const [loadAfterItem, setLoadAfterItem] = useState(useLocation().state);

  const [bascketIsActive, setBasketIsActive] = useState(0);

  const toggleBascketIsActive = (value) => {
    setBasketIsActive(value)
  }

  return (
    <div className={loadAfterItem ? classes.main + " " + classes.active : classes.main}>
      <Logo />
      <NavBar navItems={navItems} />
      <Outlet context={navItems} />
      <Footer />
      <Basket basket={basket} bascketIsActive={bascketIsActive} toggleBascketIsActive={toggleBascketIsActive}/>
      {basket && !bascketIsActive ? <BasketButton basket={basket} toggleBascketIsActive={toggleBascketIsActive} /> : false}
    </div>
  );
}

export default Main;
