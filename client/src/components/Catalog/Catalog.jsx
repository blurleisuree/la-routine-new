import React, { useState, useEffect } from "react";
import { useOutletContext, useLocation, Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import classes from './Catalog.module.css';

import Item from '../UI/Item/Item.jsx';

const Catalog = (props) => {

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
        const res = await fetch(`http://localhost:3001${pathname}?skipCount=${skipCount + skipCountValue}&limitValue=${limitValue}`);
        const json = await res.json()
        if (!json.items[0]) { // Если получаем пустой массив
            setAllProductsLoaded(true);
        }
        setItems([...items, ...json.items])
        setSkipCount(skipCount + skipCountValue)
    }

    async function loadItems() {
        const res = await fetch(`http://localhost:3001${pathname}?skipCount=${skipCount + skipCountValue}&limitValue=${limitValue}`);
        const json = await res.json()
        if (!json.items[0]) { // Если получаем пустой массив
            setAllProductsLoaded(true);
        }
        setItems([...items, ...json.items])
        setSkipCount(skipCount + skipCountValue)
    }

    const navItems = useOutletContext().navItems;
    const addItemToBasket = useOutletContext().addItemToBasket;

    let title;
    !props.navItem
        ? title = "La Routine Magazine"
        : props.navItem == 'magazine'
            ? title = "Magazine / Photo"
            : title = props.navItem[0].toUpperCase() + props.navItem.slice(1);

    // Для установки количества товаром в одном ряду (сколько прогружается товаров за раз)
    // value 3 по дефолту
    const [limitValue, setLimitValue] = useState(0);
    const [skipCountValue, setSkipCountValue] = useState(0);
    useEffect(() => {
        if (pathname !== '/bags') {
            console.log(true)
            setLimitValue(3)
            setSkipCountValue(3)
        } else {
            setLimitValue(4)
            setSkipCountValue(4)
        }
    }, [pathname])

    return (
        <div className={classes.catalog__wrapper}>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Outlet context={addItemToBasket} />
            {!items || !items[0] || pathname.match(/\d/)
                ? <h1 className={classes.miss}>Товары отсутвуют.</h1>
                : <div className={classes.catalog}>
                    {items.map((item) => <Item key={item._id} item={item} navItem={props.navItem} navItems={navItems} pathname={pathname} />)}
                    {itemsCount !== items.length &&
                        <button onClick={loadMore} className={allProductsLoaded ? classes.catalog__btn + " " + classes.disabled : classes.catalog__btn}>Загрузить ещё</button>
                    }
                </div>
            }
        </div>
    )
};

export default Catalog;