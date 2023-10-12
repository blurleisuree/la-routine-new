import React, { useState } from "react";
import { useForm } from "react-hook-form";

import classes from './Checkout.module.css';

const Checkout = ({ basket, checkoutIsActive, closeCheckout }) => {

    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <div className={checkoutIsActive ? classes.checkout + " " + classes.active : classes.checkout}>
            <div className={classes.checkout__top}>
                <img src="/imgs/icons/checkout__arrow.svg" alt="arrow" className={classes.checkout__arrow} onClick={() => closeCheckout()} />
                <h3 className={classes.checkout__title}>Ваш заказ</h3>
                <img src="/imgs/icons/cross.svg" alt="cross" onClick={() => closeCheckout()} />
            </div>
            <div className={classes.checkout__main}>
                {/* Перенести в отдельный компонент форму и инпуты */}
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <label for="full-name" className={classes.label}>Фамилия Имя Отчество</label>
                    <textarea placeholder='ФИО' className={classes.input + " " + classes.textarea} name="full-name" {...register("full-name")} />
                    <label for="address" className={classes.label}>ВАШ ПОЛНЫЙ АДРЕС + ИНДЕКС</label>
                    <textarea placeholder='Страна / Город / Улица / Квартира / Индекс ( Почтовое отделение привязывается автоматически по индексу)' className={classes.input + " " + classes.textarea} name="address" {...register("address")} />
                    <label for="email" className={classes.label}>Ваш Email</label>
                    <p className={classes.subtitle}>Вся информация по срокам отправки и куда приходит трек-номер написана на сайте в FAQ.</p>
                    <input placeholder='Обязательно указывайте правильный Email для связи' className={classes.input} name="email" {...register("email")} />
                    <label for="number" className={classes.label}>Телефонный номер</label>
                    <p className={classes.subtitle}>Трек-номер приходит ПОСЛЕ отправки!</p>
                    <input placeholder='+7 (999) 999-99-99' className={classes.input} name="number" {...register("number")} />
                    <div className={classes.checkbox__wrapper}>
                        <input type="radio" name="delivery" {...register("delivery")} className={classes.checkbox} />
                        <label for="delivery">Доставка Почтой России 390 руб.</label>
                    </div>
                    <div className={classes.checkbox__wrapper}>
                        <input type="radio" name="delivery" {...register("delivery")} className={classes.checkbox} value="Доставка курьером ЕМС Почта России (МОСКВА) 490 руб."/>
                        <label for="delivery">Доставка курьером ЕМС Почта России (МОСКВА) 490 руб.</label>
                    </div>
                    <div className={classes.checkbox__wrapper}>
                        <input type="radio" name="delivery" {...register("delivery")} className={classes.checkbox} value="Доставка по СНГ Почта России (Беларусь / Казахстан / и тд. ) 900 руб."/>
                        <label for="delivery">Доставка по СНГ Почта России (Беларусь / Казахстан / и тд. ) 900 руб.</label>
                    </div>
                    <div className={classes.checkbox__wrapper}>
                        <input type="radio" name="delivery" {...register("delivery")} className={classes.checkbox} value="Мировая Доставка Почта России (Европа / Америка / и тд. ) 1600 руб."/>
                        <label for="delivery">Мировая Доставка Почта России (Европа / Америка / и тд. ) 1600 руб.</label>
                    </div>
                    <button type="submit" className={classes.submit}>Checkout</button>
                </form>
                <div className={classes.checkout__basket}>

                </div>
            </div>
        </div >
    );
};

export default Checkout;

