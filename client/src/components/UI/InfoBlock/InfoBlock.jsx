import React from "react";

import Select from '../Select/Select.jsx';

import classes from './InfoBlock.module.css';

const InfoBlock = ({ item, params, selectOption, desc }) => {

    // У некоторых товаров разнное описание внутри одной категории (оно пишется вручную в товаре) + последнее else на случай если описания нигде нет
    let descriptionArr = [];
    if (item.description) {
        descriptionArr = item.description;
        descriptionArr = descriptionArr.split(';');
    } else if (!item.description) {
        descriptionArr = desc;
        descriptionArr = descriptionArr.split(';');
    } else {
        descriptionArr = [];
    }

    return (
        <div className={classes.infoBlock}>
            <h2 className={classes.infoBlock__name}>{item.name}</h2>
            <span className={classes.infoBlock__code}>Артикул: <span className={classes.infoBlock__code_value}>{item.code}-{params.color}</span></span>
            <h3 className={classes.infoBlock__price}>{item.price} р.</h3>
            {item.colors[0] && <Select name={'color'} onChange={selectOption} arr={item.colors} activeColor={params.color}/>}
            {item.sizes[0] && <Select name={'size'} onChange={selectOption} arr={item.sizes} />}
            {item.available
                ? <div className={classes.infoBlock__btn}>buy</div>
                : <div className={classes.infoBlock__btn + " " + classes.notAvailable}>not avaible</div>
            }
            {descriptionArr.map((str, index) =>
                <p className={classes.infoBlock__description} key={index}>{str}</p>
            )}
        </div>
    );
};

export default InfoBlock;

// db.items.updateOne({_id: ObjectId('650c7819f5fdc020eb0ca1d5')}, {$unset: {imgs_count: ''}})
// db.items.updateOne({_id: ObjectId('650c7819f5fdc020eb0ca1d5')}, {$set: {imgs: [{n: 1, color: 'white'}, {n: 2, color: 'black'}]}})
// db.items.updateOne({_id: ObjectId('650c77a3f5fdc020eb0ca1d3')}, {$set: {imgs_count: 2}})