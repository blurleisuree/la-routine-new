import React, { useEffect, useState } from 'react';

import classes from './BasketButton.module.css';

function BasketButton({ basket }) {

    const [generalPrice, setGeneralPrice] = useState(0);
    const calcPrice = (basket) => {
        return basket.reduce((prevPrice, currentItem) => {
            let price = currentItem.item.price;
            price = Number(price.replace(' ', ''));
            return prevPrice + price
        }, 0)
    }
    useEffect(() => {
        // Последнее - разделение на разряды
        setGeneralPrice(calcPrice(basket).toLocaleString('ru'))
    }, [])

    return (
        <div className={classes.basketButton__wrapper}>
            <div className={classes.basketButton__popover}>= {generalPrice} р.</div>
            <div className={classes.basketButton}>
                <svg role="img" className={classes.basketButton__svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="none" strokeWidth="2" strokeMiterlimit="10" d="M44 18h10v45H10V18h10z"></path><path fill="none" strokeWidth="2" strokeMiterlimit="10" d="M22 24V11c0-5.523 4.477-10 10-10s10 4.477 10 10v13"></path></svg>
            </div>
            <div className={classes.basketButton__num}>{basket.length}</div>
        </div>
    );
}

export default BasketButton;
