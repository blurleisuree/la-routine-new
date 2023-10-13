import React, { useState } from "react";
import { useForm } from "react-hook-form";

import classes from './Form.module.css';

import Input from '../Input/Input.jsx';

const Form = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Input name="fullName" labelText="Фамилия Имя Отчество" placeholder="ФИО" required={true} textarea={true}/>

            {/* <label htmlFor="fullName" className={classes.label}>Фамилия Имя Отчество</label>
            <textarea placeholder='ФИО' className={errors.fullName ? classes.input + " " + classes.textarea + " " + classes.inputError : classes.input + " " + classes.textarea} name="fullName" {...register("fullName", { required: true })} aria-invalid={errors.fullName ? "true" : "false"} />
            {errors.fullName && errors.fullName.type === "required" && (
                <span className={classes.error}>Обязательное поле</span>
            )} */}

            <label htmlFor="address" className={classes.label}>ВАШ ПОЛНЫЙ АДРЕС + ИНДЕКС</label>
            <textarea placeholder='Страна / Город / Улица / Квартира / Индекс ( Почтовое отделение привязывается автоматически по индексу)' className={classes.input + " " + classes.textarea} name="address" {...register("address")} />

            <label htmlFor="email" className={classes.label}>Ваш Email</label>
            <p className={classes.subtitle}>Вся информация по срокам отправки и куда приходит трек-номер написана на сайте в FAQ.</p>
            <input placeholder='Обязательно указывайте правильный Email для связи' className={classes.input} name="email" {...register("email", { required: true })} />

            <label htmlFor="number" className={classes.label}>Телефонный номер</label>
            <p className={classes.subtitle}>Трек-номер приходит ПОСЛЕ отправки!</p>
            <input placeholder='+7 (999) 999-99-99' className={classes.input} name="number" {...register("number", { required: true })} />

            <label className={classes.checkbox__wrapper} style={{ marginTop: "30px" }}>
                <input type="radio" name="delivery" {...register("delivery", { required: true })} className={classes.checkbox} />
                Доставка Почтой России 390 руб.
            </label>
            <label className={classes.checkbox__wrapper}>
                <input type="radio" name="delivery" {...register("delivery", { required: true })} className={classes.checkbox} value="Доставка курьером ЕМС Почта России (МОСКВА) 490 руб." />
                Доставка курьером ЕМС Почта России (МОСКВА) 490 руб.
            </label>
            <label className={classes.checkbox__wrapper}>
                <input type="radio" name="delivery" {...register("delivery", { required: true })} className={classes.checkbox} value="Доставка по СНГ Почта России (Беларусь / Казахстан / и тд. ) 900 руб." />
                Доставка по СНГ Почта России (Беларусь / Казахстан / и тд. ) 900 руб.
            </label>
            <label className={classes.checkbox__wrapper}>
                <input type="radio" name="delivery" {...register("delivery", { required: true })} className={classes.checkbox} value="Мировая Доставка Почта России (Европа / Америка / и тд. ) 1600 руб." />
                Мировая Доставка Почта России (Европа / Америка / и тд. ) 1600 руб.
            </label>

            <button type="submit" className={classes.submit}>Checkout</button>
        </form>
    );
};

export default Form;

