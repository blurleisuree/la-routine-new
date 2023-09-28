import React from "react";

import classes from './Select.module.css';

const Select = ({ name, onChange, arr }) => {

    return (
        <div className={classes.select__wrapper}>
            <label className={classes.label} htmlFor={name}>{name}</label>
            <select className={classes.select} onChange={onChange} name={name}>
                {arr.map((item) =>
                    <option value={item} key={item}>{item}</option>
                )}
            </select>
        </div>
    );
};

export default Select;