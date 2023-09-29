import React, { useState, useEffect, useMemo } from "react";
import { useOutletContext, useLocation, Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import classes from './Catalog.module.css';

import Item from '../UI/Item/Item.jsx';

const Catalog = ({ navItem }) => {

    const [items, setItems] = useState(null);
    const [itemsCount, setItemsCount] = useState(null);

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
        setItems(json.items)
        setItemsCount(json.count)
    }

    const [limitCount, setLimitCount] = useState(3);
    const [allProductsLoaded, setAllProductsLoaded] = useState(false);

    async function loadMore() {
        const res = await fetch(`http://localhost:3001${pathname}?limitCount=${limitCount + 3}`);
        const json = await res.json()
        if (!json.items[0]) { // Если получаем пустой массив
            setAllProductsLoaded(true);
        }
        setItems([...items, ...json.items])
        setLimitCount(limitCount + 3)
    }

    const navItems = useOutletContext();

    let title;
    !navItem
        ? title = "La Routine Magazine"
        : navItem == 'magazine'
            ? title = "Magazine / Photo"
            : title = navItem[0].toUpperCase() + navItem.slice(1);

    // Оба варианта работают (оптимизировать чтобы красиво было)
    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Outlet />
            {!items || !items[0] || pathname.match(/\d/)
                ? <h1 className={classes.miss}>Товары отсутвуют.</h1>
                : (
                    <>
                        <div className={classes.catalog}>
                            {items.map((item, index) => <Item key={item._id} item={item} navItem={navItem} itemIndex={index} navItems={navItems} />)}
                        </div >
                        {itemsCount == items.length
                            ? console.log()
                            : <button onClick={loadMore} className={allProductsLoaded ? classes.catalog__btn + " " + classes.disabled : classes.catalog__btn}>Загрузить ещё</button>
                        }
                    </>
                )
            }
        </>
    )

    // if (!items || !items[0] || pathname.match(/\d/)) { // последнее условие для того чтобы скрывать товары когда открыт один
    //     return (
    //         <>
    //             <Outlet />
    //             <h1 className={classes.miss}>Товары отсутвуют.</h1>
    //         </>
    //     )
    // } else {
    //     return (
    //         <>
    //             <Outlet />
    //             <div className={classes.catalog}>
    //                 {items.map((item, index) => <Item key={item._id} item={item} navItem={navItem} itemIndex={index} navItems={navItems} />)}
    //             </div >
    //             <button onClick={loadMore} className={allProductsLoaded ? classes.catalog__btn + " " + classes.disabled : classes.catalog__btn}>Загрузить ещё</button>
    //         </>
    //     )
    // }
};

export default Catalog;