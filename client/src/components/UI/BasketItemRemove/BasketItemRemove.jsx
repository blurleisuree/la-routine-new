import React from 'react';

import classes from './BasketItemRemove.module.css';

function BasketItemRemove({ item, changeRemoveItemActive, deleteItemFromBasket, index }) {

   

    return (
        <div className={classes.basketItemRemove}>
            <p className={classes.basketItemRemove__deleteMessage}>Вы уверены что хотите удалить "{item.item.name}"?</p>
            <div className={classes.basketItemRemove__respBlock}>
                <p className={classes.basketItemRemove__returnText} onClick={() => deleteItemFromBasket(index)}>Да</p>
                <p className={classes.basketItemRemove__returnText} onClick={() => changeRemoveItemActive(0)}>Нет</p>
            </div>
        </div>
    );
}

export default BasketItemRemove;
