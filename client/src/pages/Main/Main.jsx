import React, { useMemo, useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import classes from './Main.module.css';

import Logo from '../../components/Logo/Logo.jsx';
import NavBar from '../../components/Navbar/NavBar.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import Basket from '../../components/Basket/Basket.jsx';
import BasketButton from '../../components/UI/BasketButton/BasketButton.jsx';

function Main({ navItems, }) {

  const [loadAfterItem, setLoadAfterItem] = useState(useLocation().state);


  const [basket, setBasket] = useState([{
    item: { _id: "650c77a3f5fdc020eb0ca1d3", name: 'La Routine Tee "RED GIRL"', type: 'Tee / Photo', price: '2 690', code: 'red-girl', catalog_id: "ObjectId('6509fbe4e0c959f228fe60ca')" },
    params: { color: 'white', size: 'L' }, count: 1
  }, { item: { _id: '312', price: '4 560' }, count: 1 }, { item: { _id: '31222', price: '12 450' }, count: 1 }]);

  const deleteItemFromBasket = (index) => {
    let newBasket = basket;
    newBasket.splice(index, 1);
    setBasket([...newBasket]);
  }

  // Включить/Выключить корзину
  const [basketIsActive, setBasketIsActive] = useState(0);
  const toggleBasketIsActive = (value) => {
    setBasketIsActive(value)
  }

  // Посчитать итоговую сумму товаров
  const [generalPrice, setGeneralPrice] = useState(0);
  const calcPrice = (basket) => {
    return basket.reduce((prevPrice, currentItem) => {
      let price = currentItem.item.price;
      price = Number(price.replace(' ', ''));
      price = price * currentItem.count
      return prevPrice + price
    }, 0)
  }
  useEffect(() => {
    // Последнее - разделение на разряды
    setGeneralPrice(calcPrice(basket).toLocaleString('ru'))
  }, [])

  const changeItemCount = (index, count) => {
    let newBasket = basket
    newBasket[index].count = count
    setBasket(newBasket);
    console.log(basket)
  }

  return (
    <div className={loadAfterItem ? classes.main + " " + classes.active : classes.main}>
      <Logo />
      <NavBar navItems={navItems} />
      <Outlet context={navItems} />
      <Footer />

      <Basket basket={basket} basketIsActive={basketIsActive} toggleBasketIsActive={toggleBasketIsActive} generalPrice={generalPrice} deleteItemFromBasket={deleteItemFromBasket} changeItemCount={changeItemCount}/>
      {basket && !basketIsActive && basket.length != 0 ? <BasketButton basket={basket} toggleBasketIsActive={toggleBasketIsActive} generalPrice={generalPrice} /> : false}
    </div>
  );
}

export default Main;
