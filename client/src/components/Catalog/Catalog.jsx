import React, { useState, useEffect } from "react";
import { useOutletContext, useLocation, Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import classes from './Catalog.module.css';

import Item from '../UI/Item/Item.jsx';

const Catalog = ({navItem}) => {

    const [items, setItems] = useState(null);
    const [itemsCount, setItemsCount] = useState(null);

    const pathname = useLocation().pathname
    useEffect(() => {
        if (!pathname.match(/\d/)) { // Проверка есть ли в ссылке цифры (чтобы не перерендерить каталог когда открыт Item)
            fetchItems()
            setAllProductsLoaded(false)
            setSkipCount(0)
        }
    }, [pathname]);

    async function fetchItems() {
        const res = await fetch(`http://localhost:3001${pathname}`);
        const json = await res.json()
        setItems(json.items)
        setItemsCount(json.count)
    }

    const [skipCount, setSkipCount] = useState(0);
    const [allProductsLoaded, setAllProductsLoaded] = useState(false);

    async function loadMore() {
        const res = await fetch(`http://localhost:3001${pathname}?skipCount=${skipCount + 6}`);
        const json = await res.json()
        if (!json.items[0]) { // Если получаем пустой массив
            setAllProductsLoaded(true);
        }
        setItems([...items, ...json.items])
        setSkipCount(skipCount + 6)
    }

    const navItems = useOutletContext().navItems;
    const addItemToBasket = useOutletContext().addItemToBasket;

    let title;
    !navItem
        ? title = "La Routine Magazine"
        : navItem === 'magazine'
            ? title = "Magazine / Photo"
            : title = navItem[0].toUpperCase() + navItem.slice(1);

    return (
        <div className={classes.catalog__wrapper}>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Outlet context={addItemToBasket} />
            {!items || !items[0] || pathname.match(/\d/)
                ? <h1 className={classes.miss}>Товары отсутвуют.</h1>
                : <div className={classes.catalog}>
                    {items.map((item) => <Item key={item._id} item={item} navItem={navItem} navItems={navItems} pathname={pathname} />)}
                    {itemsCount !== items.length &&
                        <button onClick={loadMore} className={allProductsLoaded ? classes.catalog__btn + " " + classes.disabled : classes.catalog__btn}>Загрузить ещё</button>
                    }
                </div>
            }
        </div>
    )
};

export default Catalog;