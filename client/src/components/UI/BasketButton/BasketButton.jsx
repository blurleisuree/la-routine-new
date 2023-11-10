import React, { useEffect, useState } from 'react';

import classes from './BasketButton.module.css';

function BasketButton({ basket, toggleBasketIsActive, generalPrice }) {

    const [totalCount, setTotalCount] = useState(0);
    useEffect(() => {
        const countSum = basket.reduce((prevElement, currentElement) => {
            return prevElement + currentElement.count
        }, 0)
        setTotalCount(countSum)
    }, [basket])

    return (
        <div className={classes.basketButton__wrapper} onClick={() => toggleBasketIsActive(1)}>
            <div className={classes.basketButton__popover}>
                = {generalPrice.toLocaleString('ru')} р.
            </div>
            <div className={classes.basketButton}>
                <img src="/imgs/icons/basketButton.svg" alt="basketButton" className={classes.basketButton__svg} />
            </div>
            <div className={classes.basketButton__num}>
                {totalCount}
            </div>
        </div>
    );
}

export default BasketButton;
