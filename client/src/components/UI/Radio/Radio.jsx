import React from "react";

import classes from './Radio.module.css';

const Radio = ({ name, value, register, errors, required }) => {

    return (
        <label className={errors[name] ? classes.radio__wrapper + " " + classes.error : classes.radio__wrapper}>
            <input
                type="radio"
                className={classes.radio}
                name={name}
                {...register(name, { required: required })}
                value={value}
                aria-invalid={errors[name] ? "true" : "false"}
            />
            {value}
        </label>
    );
};

export default Radio;
