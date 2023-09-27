import React from "react";

import classes from './InfoBlock.module.css';

const InfoBlock = ({ item, params, selectOption }) => {

    let descriptionArr = item.description;
    descriptionArr = descriptionArr.split(';');

    return (
        <div className={classes.infoBlock}>
            <h2 className={classes.infoBlock__name}>{item.name}</h2>
            <span className={classes.infoBlock__code}>Артикул: <span className={classes.infoBlock__code_value}>{item.code}-{params.color}</span></span>
            <h3 className={classes.infoBlock__price}>{item.price} р.</h3>

            <label className={classes.infoBlock__label} htmlFor="color">Color</label>
            <select className={classes.infoBlock__select} onChange={selectOption} name="color" id="infoBlock__color">
                {item.colors.map((color) =>
                    <option value={color} >{color}</option>
                )}
            </select>
            <label className={classes.infoBlock__label} htmlFor="size">Size</label>
            <select className={classes.infoBlock__select} onChange={selectOption} name="size" id="infoBlock__size">
                {item.sizes.map((size) =>
                    <option value={size} >{size}</option>
                )}
            </select>

            {item.available
                ? <div className={classes.infoBlock__btn}>buy</div>
                : <div className={classes.infoBlock__btn + " " + classes.notAvailable}>not avaible</div>
            }
            {descriptionArr.map((str) =>
                <p className={classes.infoBlock__description}>{str}</p>
            )}
        </div>
    );
};

export default InfoBlock;