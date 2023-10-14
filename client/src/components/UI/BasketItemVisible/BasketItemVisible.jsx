import React, { useEffect, useState } from 'react';

import classes from './BasketItemVisible.module.css';

function BasketItemVisible({ item, changeRemoveItemActive, changeItemCount, index }) {

    // Для просчета цены
    const [price, setPrice] = useState(0);
    useEffect(() => {
        setPrice(item.count * Number(item.item.price.replace(' ', '')))
    }, [item])

    // Для кнопок +/-
    const changeCount = (value) => {
        if (value > 99) {
            return changeItemCount(index, 99);
        }
        if (value < 1) {
            return changeRemoveItemActive(1)
        }
        changeItemCount(index, value);
    }

    // Для инпута
    const changeInputValue = (value) => {
        if (isNaN(value)) {
            return changeItemCount(index, 1);
        }
        if (value > 99) {
            return changeItemCount(index, 99);
        }
        if (value == 0) {
            return changeItemCount(index, 1);
        }
        changeItemCount(index, value);
    }

    // Для того чтобы картинка товара соответстовала выбранному цвету
    const [colorImgIndex, setColorImgIndex] = useState(1);
    useEffect(() => {
        const imgObj = item.item.imgs.find((img) => img.color == item.params.color);
        setColorImgIndex(imgObj.n)
    }, [])
    const [paramsIsEmpty, setParamsIsEmpty] = useState(false);
    useEffect(() => {
        if (JSON.stringify(item.params) == "{}") {
            setParamsIsEmpty(true);
        }
    }, [])

    return (
        <div className={classes.basketItemVisible}>
            <img src={`/imgs/items/${item.item._id}_img${colorImgIndex}.jpg`} alt="item_img" className={classes.basketItemVisible__img} />
            <div className={classes.basketItemVisible__infoWrapper}>
                <h3 className={classes.basketItemVisible__name}>{item.item.name}</h3>
                {!paramsIsEmpty ? <p className={classes.basketItemVisible__param}>Color: {item.params.color}</p> : false}
                {!paramsIsEmpty ? <p className={classes.basketItemVisible__param}>Size: {item.params.size}</p> : false}
                <p className={classes.basketItemVisible__param}>{item.item.code}</p>
            </div>
            <div className={classes.basketItemVisible__countBlock}>
                <img src="/imgs/icons/minus.svg" alt="minus" className={classes.basketItemVisible__btn} onClick={() => changeCount(item.count - 1)} />
                <input className={classes.basketItemVisible__input} value={item.count} style={{ width: `calc(8px * ${item.count.toString().length} + 16px)` }} onChange={(e) => changeInputValue(Number(e.target.value))}></input>
                <img src="/imgs/icons/plus.svg" alt="plus" className={classes.basketItemVisible__btn} onClick={() => changeCount(item.count + 1)} />
            </div>
            <p className={classes.basketItemVisible__price}>{price.toLocaleString('ru')} р.</p>
            <img src="/imgs/icons/remove.svg" alt="remove" className={classes.basketItemVisible__remove} onClick={() => changeRemoveItemActive(1)} />
        </div>
    );
}

export default BasketItemVisible;
