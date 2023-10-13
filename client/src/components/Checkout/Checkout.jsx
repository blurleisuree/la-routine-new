import React, { useState } from "react";

import classes from './Checkout.module.css';

import Form from "../UI/Form/Form.jsx";

const Checkout = ({ basket, checkoutIsActive, closeCheckout }) => {

    return (
        <div className={checkoutIsActive ? classes.checkout + " " + classes.active : classes.checkout}>
            <div className={classes.checkout__top}>
                <img src="/imgs/icons/checkout__arrow.svg" alt="arrow" className={classes.checkout__arrow} onClick={() => closeCheckout()} />
                <h3 className={classes.checkout__title}>Ваш заказ</h3>
                <img src="/imgs/icons/cross.svg" alt="cross" onClick={() => closeCheckout()} />
            </div>
            <div className={classes.checkout__main}>
                <Form />
                <div className={classes.checkout__basket}>

                </div>
            </div>
        </div >
    );
};

export default Checkout;

