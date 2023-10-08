import React, { useEffect, useState, useMemo } from 'react';

import classes from './BasketItemVisible.module.css';

function BasketItemVisible({ item, changeRemoveItemActive, changeItemCount }) {

    const [inputValue, setInputValue] = useState(1);

    // Для изменения ширины инпута в зависимости от количества разрядов числа
    const changeWidth = (e) => {
        setInputValue(Number(e.target.value))
    }

    // Для просчета цены
    const [price, setPrice] = useState(0);
    const calcPrice = () => {
        let itemPrice = item.item.price.replace(' ', '');
        itemPrice = Number(itemPrice);
        setPrice(itemPrice * inputValue);
    }

    // При смене количества товара
    useMemo(() => {
        calcPrice()
        if (inputValue > 99) {
            setInputValue(99)
        }
        if (inputValue < 1) {
            changeRemoveItemActive(1)
        }
    }, [inputValue])

    return (
        <div className={classes.basketItemVisible}>
            <img src={`/imgs/items/${item.item._id}_img1.jpg`} alt="item_img" className={classes.basketItemVisible__img} />
            <div className={classes.basketItemVisible__infoWrapper}>
                <h3 className={classes.basketItemVisible__name}>{item.item.name}</h3>
                {item.params ? <p className={classes.basketItemVisible__param}>Color: {item.params.color}</p> : false}
                {item.params ? <p className={classes.basketItemVisible__param}>Size: {item.params.size}</p> : false}
                <p className={classes.basketItemVisible__param}>{item.item.code}</p>
            </div>
            <div className={classes.basketItemVisible__countBlock}>
                <img src="/imgs/icons/minus.svg" alt="minus" className={classes.basketItemVisible__btn} onClick={() => setInputValue(inputValue - 1)} />
                <input className={classes.basketItemVisible__input} value={inputValue} style={{ width: `calc(8px * ${inputValue.toString().length} + 16px)` }} onChange={(e) => changeWidth(e)}></input>
                <img src="/imgs/icons/plus.svg" alt="plus" className={classes.basketItemVisible__btn} onClick={() => setInputValue(inputValue + 1)} />
            </div>
            <p className={classes.basketItemVisible__price}>{price.toLocaleString('ru')} р.</p>
            <img src="/imgs/icons/remove.svg" alt="remove" className={classes.basketItemVisible__remove} onClick={() => changeRemoveItemActive(1)}/>
        </div>
    );
}

export default BasketItemVisible;
