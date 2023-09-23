import React from "react";
import { useOutletContext } from 'react-router-dom';

import classes from './Catalog.module.css';

import Item from '../UI/Item/Item.jsx';

const Catalog = (props) => {

    let items = useOutletContext();
    items = items[props.itemIndex];
    items != undefined
        ? items = items[props.navItem]
        : console.log()

    return (
        <div className={classes.catalog}>
            {items == undefined
                ? <h1 className={classes.miss}>Товары отсутвуют.</h1>
                : items.map((item, index) => <Item item={item} navItem={props.navItem} itemIndex={index} />)
            }
        </div>
    )

};

export default Catalog;