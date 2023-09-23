import React, { useState, useEffect } from "react";
import { useOutletContext, useLocation } from 'react-router-dom';

import classes from './Catalog.module.css';

import Item from '../UI/Item/Item.jsx';

const Catalog = (props) => {

    // let items = useOutletContext();
    // items = items[props.itemIndex];
    // items != undefined
    //     ? items = items[props.navItem]
    //     : console.log()

    const [items, setItems] = useState(null);

    const path = useLocation().pathname.slice(1)
    useEffect(() => {
        fetchItems(path)
    }, [path]);

    async function fetchItems(category) {
        const res = await fetch(`http://localhost:3001/${category}`);
        const json = await res.json()
        setItems(json)
    }

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