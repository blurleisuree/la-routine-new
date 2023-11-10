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
      <img src="/imgs/icons/cross.svg" alt="cross" onClick={() => toggleBasketIsActive(0)} className={classes.basket__cross} />
      <h1 className={classes.basket__title}>Ваш заказ</h1>
      <div className={classes.basket__line}></div>
      {basket.map((item, index) =>
        <BasketItem
          key={item.item._id + item.params.color + item.params.size}
          item={item}
          deleteItemFromBasket={deleteItemFromBasket}
          index={index}
          changeItemCount={changeItemCount} />
      )}
      <div className={classes.basket__line}></div>
      <p className={classes.basket__price}>Сумма: {generalPrice.toLocaleString('ru')} р.</p>
      <div className={classes.basket__btn} onClick={() => openCheckout()}>Checkout</div>
    </div>
  );
}

export default Basket;
