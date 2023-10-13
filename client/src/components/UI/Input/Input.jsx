import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';

import classes from './Input.module.css';

const Input = ({ name, labelText, placeholder, required, textarea }) => {

    const { register, formState: { errors } } = useForm();

    const [inputClasses, setInputClasses] = useState('');
    useEffect(() => {
        if (textarea) {
            setInputClasses(classes.textarea + " " + classes.input);
        } else {
            setInputClasses(classes.input);
        }
    }, [textarea])

    return (
        <div className={classes.input__wrapper}>
            <label htmlFor={name} className={classes.label}>{labelText}</label>
            {textarea
                ? <textarea
                    placeholder={placeholder}
                    className={errors.name ? inputClasses + " " + classes.inputError : inputClasses}
                    name={name}
                    {...register(name, { required: required })}
                    aria-invalid={errors.name ? "true" : "false"}
                />
                : <input
                    placeholder={placeholder}
                    className={errors.name ? inputClasses + " " + classes.inputError : inputClasses}
                    name={name}
                    {...register(name, { required: required })}
                    aria-invalid={errors.name ? "true" : "false"}
                />
            }

            {errors.name && errors.name.type === "required" && (
                <span className={classes.error}>Обязательное поле</span>
            )}
        </div>
    );
};

export default Input;
