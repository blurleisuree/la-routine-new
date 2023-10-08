import React, { useState } from 'react';

import classes from './BasketItem.module.css';

import BasketItemRemove from '../BasketItemRemove/BasketItemRemove.jsx';
import BasketItemVisible from '../BasketItemVisible/BasketItemVisible.jsx';

function BasketItem({ item, deleteItemFromBasket, index, changeItemCount }) {

    // Для удаления товара из корзины
    const [removeItemActive, setRemoveItemActive] = useState(0);

    const changeRemoveItemActive = (value) => {
        setRemoveItemActive(value)
    }
    
    return (
        <div className={classes.basketItem}>
            {removeItemActive
                ? <BasketItemRemove item={item} changeRemoveItemActive={changeRemoveItemActive} deleteItemFromBasket={deleteItemFromBasket} index={index}/>
                : <BasketItemVisible item={item} changeRemoveItemActive={changeRemoveItemActive} changeItemCount={changeItemCount}/>
            }
        </div>
    );
}

export default BasketItem;
