import React, { useState, useEffect } from "react";
import { useOutletContext, useLocation, Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import classes from './Catalog.module.css';

import Item from '../UI/Item/Item.jsx';

import serverUrl from '../../data/serverUrl.js';

const Catalog = ({ navItem }) => {

    const [items, setItems] = useState(null);
    const [itemsCount, setItemsCount] = useState(null);

    const [skipCount, setSkipCount] = useState(0);
    const [allProductsLoaded, setAllProductsLoaded] = useState(false);
    // Тут устанавливать через сколько товаров нужно загружать заново
    const limitValue = 6;

    const pathname = useLocation().pathname
    useEffect(() => {
        if (!pathname.match(/\d/)) { // Проверка есть ли в ссылке цифры (чтобы не перерендерить каталог когда открыт Item)
            fetchItems()
            setAllProductsLoaded(false)
            setSkipCount(0)
        }
    }, [pathname]);

    async function fetchItems() {
        const res = await fetch(`${serverUrl}${pathname}?limitValue=${limitValue}`);
        const json = await res.json()
        setItems(json.items)
        setItemsCount(json.count)
    }

    async function loadMore() {
        const res = await fetch(`${serverUrl}${pathname}?skipCount=${skipCount + limitValue}&limitValue=${limitValue}`);
        const json = await res.json()
        if (!json.items[0]) { // Если получаем пустой массив
            setAllProductsLoaded(true);
        }
        setItems([...items, ...json.items])
        setSkipCount(skipCount + limitValue)
    }

    const navItems = useOutletContext().navItems;
    const addItemToBasket = useOutletContext().addItemToBasket;

    let title;
    !navItem
        ? title = "La Routine Magazine"
        : navItem === 'magazine'
            ? title = "Magazine / Photo"
            : title = navItem[0].toUpperCase() + navItem.slice(1);

    const itemCardIsActive = useOutletContext().itemCardIsActive

    return (
        <div className={classes.catalog__wrapper}>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Outlet context={addItemToBasket} />
            {pathname.match(/\d/)
                ? false
                : !items || !items[0]
                    ? <h1 className={classes.miss}>Товары отсутвуют.</h1>
                    : <div className={classes.catalog}>
                        {items.map((item) =>
                            <Item
                                key={item._id}
                                item={item}
                                navItem={navItem}
                                navItems={navItems}
                                pathname={pathname}
                                toggleBasketIsActive={itemCardIsActive}
                            />
                        )}
                        {itemsCount !== items.length &&
                            <button
                                onClick={loadMore}
                                className={allProductsLoaded ? classes.catalog__btn + " " + classes.disabled : classes.catalog__btn}
                            >
                                Загрузить ещё
                            </button>
                        }
                    </div>
            }
        </div>
    )
};

export default Catalog;