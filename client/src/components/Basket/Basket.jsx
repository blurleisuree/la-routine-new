import React, { useEffect } from 'react';

import classes from './Basket.module.css';

import BasketItem from '../UI/BascketItem/BasketItem.jsx';

function Basket({ basket, basketIsActive, toggleBasketIsActive, generalPrice, deleteItemFromBasket, changeItemCount, openCheckout }) {

  useEffect(() => {
    if (basket.length === 0) {
      toggleBasketIsActive(0)
    }
  }, [basket])

  return (
    <div className={basketIsActive ? classes.basket__wrapper + " " + classes.active : classes.basket__wrapper}>
      <svg role="presentation" onClick={() => toggleBasketIsActive(0)} className={classes.basket__cross} width="23px" height="23px" viewBox="0 0 23 23" version="1.1" xmlns="http://www.w3.org/2000/svg"><g stroke="none" strokeWidth="1" fill="#000" fillRule="evenodd"><rect transform="translate(11.313708, 11.313708) rotate(-45.000000) translate(-11.313708, -11.313708) " x="10.3137085" y="-3.6862915" width="2" height="30"></rect><rect transform="translate(11.313708, 11.313708) rotate(-315.000000) translate(-11.313708, -11.313708) " x="10.3137085" y="-3.6862915" width="2" height="30"></rect></g></svg>
      <h1 className={classes.basket__title}>Ваш заказ</h1>
      <div className={classes.basket__line}></div>
      {basket.map((item, index) =>
        <BasketItem key={item.item._id + item.params.color + item.params.size} item={item} deleteItemFromBasket={deleteItemFromBasket} index={index} changeItemCount={changeItemCount} />
      )}
      <div className={classes.basket__line}></div>
      <p className={classes.basket__price}>Сумма: {generalPrice.toLocaleString('ru')} р.</p>
      <div className={classes.basket__btn} onClick={() => openCheckout()}>Checkout</div>
    </div>
  );
}

export default Basket;
