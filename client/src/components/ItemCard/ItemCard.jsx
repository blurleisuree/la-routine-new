import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from 'react-router-dom';

import classes from './ItemCard.module.css';

import InfoBlock from '../../components/UI/InfoBlock/InfoBlock.jsx';
import Tabs from '../../components/UI/Tabs/Tabs.jsx';
import ImgCarousel from "../../components/UI/ImgCarousel/ImgCarousel.jsx";

const ItemCard = (props) => {

    const [item, setItems] = useState(null);
    useEffect(() => {
        fetchItems()
    }, []);

    const pathname = useLocation().pathname
    async function fetchItems() {
        const res = await fetch(`http://localhost:3001${pathname}`);
        const json = await res.json()
        setItems(json)
    }

    const [params, setParams] = useState(null)
    useMemo(() => {
        if (item) {
            return setParams({ color: item.colors[0], size: item.sizes[0] })
        }
    }, [item])

    // Состояние и функцию можно оставить тут потому что потом надо будет делать функцию изменения артикула при изменении фотографии
    const selectOption = (e) => {
        const value = e.target.options[e.target.selectedIndex].value;
        const name = e.target.name;
        setParams({
            ...params,
            [name]: value,
        });
    }

    return (
        !item && !params
            ? console.log()
            : <div className={classes.itemCard} >
                <div className={classes.itemCard__top}>
                    <Link to={".."} className={classes.itemCard__more}>
                        <span>←</span>
                        <p>More products</p>
                    </Link>
                    <Link to={".."} className={classes.itemCard__cross}>
                        <svg width="23px" height="23px" viewBox="0 0 23 23" version="1.1" ><g stroke="none" stroke-width="1" fill="#000000" fill-rule="evenodd"><rect transform="translate(11.313708, 11.313708) rotate(-45.000000) translate(-11.313708, -11.313708) " x="10.3137085" y="-3.6862915" width="2" height="30"></rect><rect transform="translate(11.313708, 11.313708) rotate(-315.000000) translate(-11.313708, -11.313708) " x="10.3137085" y="-3.6862915" width="2" height="30"></rect></g></svg>
                    </Link>
                </div>
                <div className={classes.itemCard__wrapper}>
                    <div className={classes.itemCard__inner}>
                        <ImgCarousel item={item} params={params} setParams={setParams} />
                        <InfoBlock item={item} selectOption={selectOption} params={params} />
                    </div>
                    <Tabs />
                </div>
            </div>
    );
};

export default ItemCard;

