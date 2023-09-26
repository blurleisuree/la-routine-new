import React, { useState, useEffect } from "react";
import { useOutletContext, useLocation, Outlet } from 'react-router-dom';

import classes from './Catalog.module.css';

import Item from '../UI/Item/Item.jsx';

const Catalog = ({ navItem }) => {

    // let items = useOutletContext();
    // items = items[props.itemIndex];
    // items != undefined
    //     ? items = items[props.navItem]
    //     : console.log()

    const [items, setItems] = useState(null);

    const pathname = useLocation().pathname
    useEffect(() => {
        pathname.match(/\d/) // Проверка есть ли в ссылке цифры (чтобы не перерендерить каталог когда открыт Item)
            ? console.log()
            : fetchItems()
    }, [pathname]);

    async function fetchItems() {
        const res = await fetch(`http://localhost:3001${pathname}`);
        const json = await res.json()
        setItems(json)
    }

    return (
        <div className={classes.catalog}>
            <Outlet />
            {items == undefined
                ? <h1 className={classes.miss}>Товары отсутвуют.</h1>
                : items.map((item, index) => <Item item={item} navItem={navItem} itemIndex={index} />)
            }
        </div>
    )

};

export default Catalog;