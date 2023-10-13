import React, { useEffect, useState } from "react";

import classes from './Input.module.css';

const Input = ({ name, labelText, placeholder, textarea, register, errors, required, subtitleText, type }) => {


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
            {subtitleText && <p className={classes.subtitle}>{subtitleText}</p>}
            {textarea
                ? <textarea
                    type={type}
                    placeholder={placeholder}
                    className={errors[name] ? inputClasses + " " + classes.inputError : inputClasses}
                    name={name}
                    {...register(name, { required: required })}
                    aria-invalid={errors[name] ? "true" : "false"}
                />
                : <input
                    type={type}
                    placeholder={placeholder}
                    className={errors[name] ? inputClasses + " " + classes.inputError : inputClasses}
                    name={name}
                    {...register(name, { required: required })}
                    aria-invalid={errors[name] ? "true" : "false"}
                />
            }

            {errors[name] && errors[name].type === "required" && (
                <span className={classes.error}>Обязательное поле</span>
            )}
        </div>
    );
};

export default Input;
