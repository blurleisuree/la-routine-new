import React, { useState, useEffect, useMemo } from "react";
import { useOutletContext, useLocation, Outlet } from 'react-router-dom';

import classes from './Catalog.module.css';

import Item from '../UI/Item/Item.jsx';

const Catalog = ({ navItem }) => {

    const [items, setItems] = useState(null);

    const pathname = useLocation().pathname
    useEffect(() => {
        if (!pathname.match(/\d/)) { // Проверка есть ли в ссылке цифры (чтобы не перерендерить каталог когда открыт Item)
            fetchItems()
            setAllProductsLoaded(false)
            setLimitCount(3)
        }
    }, [pathname]);

    async function fetchItems() {
        const res = await fetch(`http://localhost:3001${pathname}`);
        const json = await res.json()
        setItems(json)
    }

    const [limitCount, setLimitCount] = useState(3);
    const [allProductsLoaded, setAllProductsLoaded] = useState(false);

    async function loadMore() {
        const res = await fetch(`http://localhost:3001${pathname}?limitCount=${limitCount + 3}`);
        const json = await res.json()
        if (!json[0]) { // Если получаем пустой массив
            setAllProductsLoaded(true);
        }
        setItems([...items, ...json])
        setLimitCount(limitCount + 3)
    }

    const navItems = useOutletContext();

    // Сортировка по новым товарам (хз как работает sort)
    if (items) {
        items.sort((a, b) => {
            return b.new - a.new
        })
    }

    if (!items || !items[0] || pathname.match(/\d/)) { // последнее условие для того чтобы скрывать товары когда открыт один
        return (
            <>
                <Outlet />
                <h1 className={classes.miss}>Товары отсутвуют.</h1>
            </>
        )
    } else {
        return (
            <>
                <Outlet />
                <div className={classes.catalog}>

                    {items.map((item, index) => <Item item={item} navItem={navItem} itemIndex={index} navItems={navItems} />)}

                </div >
                <button onClick={loadMore} className={allProductsLoaded ? classes.catalog__btn + " " + classes.disabled : classes.catalog__btn}>Загрузить ещё</button>
            </>
        )
    }
};

export default Catalog;