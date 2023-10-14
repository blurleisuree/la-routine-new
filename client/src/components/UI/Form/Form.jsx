import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from 'react-router-dom';

import classes from './Form.module.css';

import Input from '../Input/Input.jsx';
import Radio from '../Radio/Radio.jsx';

const Form = ({ toggleState }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        sendMail(data)
        setFormData({ fullName: "", address: "", email: "", number: "", delivery: "" });
    };

    const pathname = useLocation().pathname
    async function sendMail(data) {
        const res = await fetch(`http://localhost:3001${pathname}/mail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullName: data.fullName,
                address: data.address,
                email: data.email,
                number: data.number,
                delivery: data.delivery
            })
        });
        const json = await res.json()
        console.log(json)
    }

    // Чтобы formData не перезаписывалась при её объявлении
    const initialData = localStorage.getItem('formData');
    const initialFormData = initialData ? JSON.parse(initialData) : { fullName: "", address: "", email: "", number: "", delivery: "" };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        localStorage.setItem('formData', JSON.stringify(formData));
        toggleState();
    }, [formData])

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
                onChange={handleChange}
                value={formData.fullName}
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
                onChange={handleChange}
                value={formData.address}
            />
            <Input
                name="email"
                labelText="Ваш Email"
                placeholder="Обязательно указывайте правильный Email для связи"
                required={true}
                textarea={false}
                subtitleText="Вся информация по срокам отправки и куда приходит трек-номер написана на сайте в FAQ."
                type="text"
                pattern={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i}
                register={register}
                errors={errors}
                onChange={handleChange}
                value={formData.email}
            />
            <Input
                name="number"
                labelText="Телефонный номер"
                placeholder="+7 (999) 999-99-99"
                required={true}
                textarea={false}
                subtitleText="Трек-номер приходит ПОСЛЕ отправки!"
                type="number"
                pattern={/^(?:\+?\d{1,3}\s?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{2}[-.\s]?\d{2}$/}
                register={register}
                errors={errors}
                onChange={handleChange}
                value={formData.number}
            />

            <Radio
                name='delivery'
                value="Доставка Почтой России 390 р."
                errors={errors}
                required={true}
                register={register}
                onChange={handleChange}
                formDataDelivery={formData.delivery}
            />
            <Radio
                name='delivery'
                value="Доставка курьером ЕМС Почта России (МОСКВА) 490 р."
                errors={errors}
                required={true}
                register={register}
                onChange={handleChange}
                formDataDelivery={formData.delivery}
            />
            <Radio
                name='delivery'
                value="Доставка по СНГ Почта России (Беларусь / Казахстан / и тд. ) 900 р."
                errors={errors}
                required={true}
                register={register}
                onChange={handleChange}
                formDataDelivery={formData.delivery}
            />
            <Radio
                name='delivery'
                value="Мировая Доставка Почта России (Европа / Америка / и тд. ) 1600 р."
                errors={errors}
                required={true}
                register={register}
                onChange={handleChange}
                formDataDelivery={formData.delivery}
            />

            <button type="submit" className={classes.submit}>Checkout</button>
        </form>
    );
};

export default Form;

