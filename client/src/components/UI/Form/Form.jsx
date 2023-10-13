import React, { useState } from "react";
import { useForm } from "react-hook-form";

import classes from './Form.module.css';

import Input from '../Input/Input.jsx';
import Radio from '../Radio/Radio.jsx';

const Form = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Input
                name="fullName"
                labelText="Фамилия Имя Отчество"
                placeholder="ФИО"
                required={true}
                textarea={true}
                type="text"
                register={register}
                errors={errors}
            />
            <Input
                name="address"
                labelText="ВАШ ПОЛНЫЙ АДРЕС + ИНДЕКС"
                placeholder="Страна / Город / Улица / Квартира / Индекс ( Почтовое отделение привязывается автоматически по индексу)"
                required={true}
                textarea={true}
                type="text"
                register={register}
                errors={errors}
            />
            <Input
                name="email"
                labelText="Ваш Email"
                placeholder="Вся информация по срокам отправки и куда приходит трек-номер написана на сайте в FAQ."
                required={true}
                textarea={false}
                subtitleText="Вся информация по срокам отправки и куда приходит трек-номер написана на сайте в FAQ."
                type="text"
                register={register}
                errors={errors}
            />
            <Input
                name="number"
                labelText="Телефонный номер"
                placeholder="+7 (999) 999-99-99"
                required={true}
                textarea={false}
                subtitleText="Трек-номер приходит ПОСЛЕ отправки!"
                type="number"
                register={register}
                errors={errors}
            />

            <Radio
                name='delivery'
                value="Доставка Почтой России 390 руб."
                errors={errors}
                required={true}
                register={register}
            />
            <Radio
                name='delivery'
                value="Доставка курьером ЕМС Почта России (МОСКВА) 490 руб."
                errors={errors}
                required={true}
                register={register}
            />
            <Radio
                name='delivery'
                value="Доставка по СНГ Почта России (Беларусь / Казахстан / и тд. ) 900 руб."
                errors={errors}
                required={true}
                register={register}
            />
            <Radio
                name='delivery'
                value="Мировая Доставка Почта России (Европа / Америка / и тд. ) 1600 руб."
                errors={errors}
                required={true}
                register={register}
            />

            <button type="submit" className={classes.submit}>Checkout</button>
        </form>
    );
};

export default Form;

