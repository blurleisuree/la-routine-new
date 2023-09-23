import React from "react";

import classes from './InfoBlock.module.css';

const InfoBlock = (props) => {

    const item = props.item;

    let descriptionArr = item.description;
    descriptionArr = descriptionArr.split(';')

    // const gg = (e) => {
    //     e.target.selectedIndex = 1
    // }

    return (
        <div className={classes.infoBlock}>
            <h2 className={classes.infoBlock__name}>{item.name}</h2>
            <span className={classes.infoBlock__code}>Артикул: <span className={classes.infoBlock__code_value}>{item.code}-{props.params.color}</span></span>
            <h3 className={classes.infoBlock__price}>{item.price} р.</h3>

            <label className={classes.infoBlock__label} htmlFor="color">Color</label>
            <select className={classes.infoBlock__select} onChange={props.selectOption} name="color" id="infoBlock__color">
                {item.colors.map((color) =>
                    <option value={color} >{color}</option>
                )}
            </select>
            <label className={classes.infoBlock__label} htmlFor="size">Size</label>
            <select className={classes.infoBlock__select} onChange={props.selectOption} name="size" id="infoBlock__size">
                {item.sizes.map((size) =>
                    <option value={size} >{size}</option>
                )}
            </select>

            <div className={classes.infoBlock__btn}>buy</div>
            {descriptionArr.map((str) =>
                <p className={classes.infoBlock__description}>{str}</p>
            )}
        </div>
    );
};

export default InfoBlock;