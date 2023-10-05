import React from "react";
import { Link } from 'react-router-dom';

import classes from './Item.module.css';

const Item = ({ item, navItem, navItems }) => {

    const mouseOver = (e) => {
        e.target.style.opacity = 0;
    }
    const mouseOut = (e) => {
        e.target.style.opacity = 1;
    }

    const isNew = !navItem

    if (!navItem) {
        navItems.forEach(el => {
            if (el._id == item.catalog_id) {
                navItem = el.name
            }
        });
    }

    // На случай если нет второй картинки и размерной сетки
    const disableHover = (e) => {
        e.target.parentNode.style.pointerEvents = 'none';
    }

    return (
        <Link to={`/${navItem}/${item._id}`} state={{ isNew }}>
            <div className={classes.item}>
                <img onMouseOver={mouseOver} onMouseOut={mouseOut} src={`/imgs/items/${item._id}_img1.jpg`} alt="item" className={classes.item__img + " " + classes.item__img_1} />
                {item.imgs.length > 1
                    ? <img onMouseOver={mouseOver} onMouseOut={mouseOut} src={`/imgs/items/${item._id}_img2.jpg`} alt="item" className={classes.item__img + " " + classes.item__img_2} />
                    : <img onMouseOver={mouseOver} onMouseOut={mouseOut} onError={(e) => disableHover(e)} src={`/imgs/general/${navItem}_sizes.jpg`} alt="item" className={classes.item__img + " " + classes.item__img_2} />
                }
                <h2 className={classes.item__name}>{item.name}</h2>
                <p className={classes.item__type}>{item.type}</p>
                <p className={classes.item__price}>{item.price} р.</p>
                {item.new && <div className={classes.item__new}><p className={classes.item__newText}>new</p></div>}
            </div>
        </Link>
    );
};

export default Item;