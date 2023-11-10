import React, { useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive'

import classes from './Checkout.module.css';

import Form from "../UI/Form/Form.jsx";
import BasketItem from "../UI/BascketItem/BasketItem.jsx";

const Checkout = ({ basket, checkoutIsActive, closeCheckout, deleteItemFromBasket, changeItemCount, generalPrice, clearBasket }) => {

    // Чтобы отслеживать когда поменялось состояние формы
    const [localStorageHasUpdated, setLocalStorageHasUpdated] = useState(false);
    const toggleState = () => {
        if (localStorageHasUpdated) {
            setLocalStorageHasUpdated(false);
        } else {
            setLocalStorageHasUpdated(true);
        }
    }

    // Получаю вариант доставки через LS
    const [selectedDelivery, setSelectedDelivery] = useState("Доставка Почтой России 390 р.")
    useEffect(() => {
        const initialData = localStorage.getItem('formData');
        const initialFormData = initialData ? JSON.parse(initialData) : false;
        setSelectedDelivery(initialFormData.delivery);
    }, [localStorageHasUpdated])

    useEffect(() => {
        if (basket.length === 0) {
            closeCheckout();
        }
    }, [basket])

    const media = useMediaQuery({ query: '(max-width: 1023px)' })

    return (
        <div className={checkoutIsActive ? classes.checkout + " " + classes.active : classes.checkout}>
            <div className={classes.checkout__top}>
                <img src="/imgs/icons/checkout__arrow.svg" alt="arrow" className={classes.checkout__arrow} onClick={closeCheckout} />
                <h3 className={classes.checkout__title}>Ваш заказ</h3>
                <img src="/imgs/icons/checkout__cross.svg" alt="cross" onClick={closeCheckout} />
            </div>
            {media
                ? <div className={classes.checkout__main}>
                    <div className={classes.checkout__rightside}>
                        <div className={classes.checkout__basket}>
                            {basket.map((item, index) =>
                                <BasketItem
                                    key={item.item._id + item.params.color + item.params.size}
                                    item={item}
                                    deleteItemFromBasket={deleteItemFromBasket}
                                    index={index}
                                    changeItemCount={changeItemCount} />
                            )}
                        </div>
                    </div>
                    <div className={classes.line}></div>
                    <div className={classes.checkout__priceBlock}>
                        <p className={classes.checkout__priceText}>
                            Сумма: {generalPrice.toLocaleString('ru')} р.
                        </p>
                        <p className={classes.checkout__priceText}>
                            {selectedDelivery}
                        </p>
                        <p className={classes.checkout__priceText + " " + classes.checkout__priceText_general}>
                            Итоговая сумма: {(generalPrice + Number(selectedDelivery.match(/\d+/))).toLocaleString('ru')} р.
                        </p>
                    </div>
                    <Form toggleState={toggleState} clearBasket={clearBasket} />
                </div>
                : <div className={classes.checkout__main}>
                    <Form toggleState={toggleState} clearBasket={clearBasket} />
                    <div className={classes.checkout__rightside}>
                        <div className={classes.checkout__basket}>
                            {basket.map((item, index) =>
                                <BasketItem
                                    key={item.item._id + item.params.color + item.params.size}
                                    item={item}
                                    deleteItemFromBasket={deleteItemFromBasket}
                                    index={index}
                                    changeItemCount={changeItemCount} />
                            )}
                        </div>
                        <div className={classes.checkout__priceBlock}>
                            <p className={classes.checkout__priceText}>
                                Сумма: {generalPrice.toLocaleString('ru')} р.
                            </p>
                            <p className={classes.checkout__priceText}>
                                {selectedDelivery}
                            </p>
                            <p className={classes.checkout__priceText + " " + classes.checkout__priceText_general}>
                                Итоговая сумма: {(generalPrice + Number(selectedDelivery.match(/\d+/))).toLocaleString('ru')} р.
                            </p>
                        </div>
                    </div>
                </div>
            }
        </div >
    );
};

export default Checkout;

