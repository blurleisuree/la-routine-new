import React from 'react';

import classes from './Basket.module.css';

function Basket({ basket, bascketIsActive, toggleBascketIsActive }) {

  return (
    <div className={bascketIsActive ? classes.basket__wrapper + " " + classes.active : classes.basket__wrapper}>

    </div>
  );
}

export default Basket;
