import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import classes from './Main.module.css';

import Logo from '../../components/Logo/Logo.jsx';
import NavBar from '../../components/Navbar/NavBar.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import Basket from '../../components/Basket/Basket.jsx';
import BasketButton from '../../components/UI/BasketButton/BasketButton.jsx';
import Checkout from '../../components/Checkout/Checkout.jsx';

function Main({ navItems, setOverlayIsActive, isClickedOnOverlay, setIsClickedOnOverlay }) {

  const [loadAfterItem, setLoadAfterItem] = useState(useLocation().state);

  const [basket, setBasket] = useState([]);
  const addItemToBasket = (item, params) => {
    // Чтобы анимация срабатывала
    setTimeout(() => {
      setBasketIsActive(1)
    }, 250)

    // Обновление состояния оверлея чтобы он работал
    setIsClickedOnOverlay(false)

    let itemIsNew;
    // Если в корзине нет ни одного товара
    if (!basket.length) {
      itemIsNew = true;
    }
    // Если корзина не пустая (id !=)
    if (!itemIsNew) {
      itemIsNew = !basket.some(basketItem => basketItem.item._id === item._id);
    }
    // Если одинаковые id проверка на одинаковые params
    if (!itemIsNew) {
      const itemsWithSameId = basket.filter((basketItem) => basketItem.item._id === item._id);
      itemIsNew = !itemsWithSameId.some((basketItem) => basketItem.params.color === params.color && basketItem.params.size === params.size)
    }
    // Если все проверки пройдены
    if (itemIsNew) {
      const newItem = { item, params, count: 1 };
      setBasket([...basket, newItem]);
      localStorage.setItem("userBasket", JSON.stringify([...basket, newItem]))
    } else {
      // Если полностью одинаковые товара - увеличить количество товаров в корзине на 1
      const basketItem = basket.find((basketItem) => basketItem.item._id === item._id && basketItem.params.color === params.color && basketItem.params.size === params.size);
      basketItem.count += 1;
      setBasket([...basket]);
      localStorage.setItem("userBasket", JSON.stringify([...basket]))
    }
    // Плохо что 4 перебора в функции
  }

  const deleteItemFromBasket = (index) => {
    let newBasket = basket;
    newBasket.splice(index, 1);
    setBasket([...newBasket]);
    localStorage.setItem("userBasket", JSON.stringify(newBasket))
  }

  const clearBasket = () => {
    setBasket([]);
    localStorage.setItem("userBasket", JSON.stringify([]))
  }

  // Включить/Выключить корзину
  const [basketIsActive, setBasketIsActive] = useState(0);
  const toggleBasketIsActive = (value) => {
    setBasketIsActive(value)
    // Обновление состояния оверлея чтобы он работал
    setIsClickedOnOverlay(!value)
  }

  // Посчитать итоговую сумму товаров
  const [generalPrice, setGeneralPrice] = useState(0);
  const calcPrice = () => {
    return basket.reduce((prevPrice, currentItem) => {
      let price = currentItem.item.price;
      price = Number(price.replace(' ', ''));
      price = price * currentItem.count
      return prevPrice + price
    }, 0)
  }

  // Изменение количества товаров в корзине
  const changeItemCount = (index, count) => {
    let newBasket = basket.map((item, i) => {
      if (i === index) {
        return { ...item, count: count }
      }
      return item
    })
    setBasket(newBasket);
    localStorage.setItem("userBasket", JSON.stringify(newBasket))
  }

  // Обновление корзины при загрузке страницы
  const getBasketFromLS = () => {
    return JSON.parse(localStorage.getItem("userBasket"));
  }
  useEffect(() => {
    const ls = getBasketFromLS();
    if (ls != null) {
      setBasket(getBasketFromLS())
    }
  }, [])

  // Обновление суммы товаров при изменении корзины
  useEffect(() => {
    setGeneralPrice(calcPrice())
  }, [basket])

  // Переключение оверлея
  useEffect(() => {
    if (basketIsActive) {
      document.body.classList.add('active');
      // Чтобы анимация срабатывала
      setTimeout(() => {
        setOverlayIsActive('active')
      }, 0)
    } else {
      document.body.classList.remove('active')
      setOverlayIsActive(false)
    }
  }, [basketIsActive])

  useEffect(() => {
    if (isClickedOnOverlay) {
      setBasketIsActive(false)
    }
  }, [isClickedOnOverlay])

  const [checkoutIsActive, setCheckoutIsActive] = useState(false);
  const closeCheckout = () => {
    document.body.classList.remove('active');
    setCheckoutIsActive(false)
  }
  const openCheckout = () => {
    setBasketIsActive(false)
    setOverlayIsActive(false)
    // document.body.classList.add('active');
    setCheckoutIsActive(true)
  }

  useEffect(() => {
    if (checkoutIsActive) {
      document.body.classList.add('active');
    } else {
      document.body.classList.remove('active');
    }
  }, [checkoutIsActive])

  return (
    <div className={loadAfterItem ? classes.main + " " + classes.active : classes.main}>
      <Logo />
      <NavBar navItems={navItems} />
      <Outlet context={{ navItems, addItemToBasket, toggleBasketIsActive }} />
      <Footer />

      <Checkout
        basket={basket}
        checkoutIsActive={checkoutIsActive}
        closeCheckout={closeCheckout}
        deleteItemFromBasket={deleteItemFromBasket}
        changeItemCount={changeItemCount}
        generalPrice={generalPrice}
        clearBasket={clearBasket}
      />

      <Basket
        basket={basket}
        basketIsActive={basketIsActive}
        toggleBasketIsActive={toggleBasketIsActive}
        generalPrice={generalPrice}
        deleteItemFromBasket={deleteItemFromBasket}
        changeItemCount={changeItemCount}
        openCheckout={openCheckout}
      />

      {basket && !basketIsActive && basket.length !== 0 ? <BasketButton basket={basket} toggleBasketIsActive={toggleBasketIsActive} generalPrice={generalPrice} /> : false}
    </div>
  );
}

export default Main;
