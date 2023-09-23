import React from "react";
import { Link } from 'react-router-dom';

import classes from './Item.module.css';

const Item = (props) => {

    const mouseOver = (e) => {
        e.target.style.opacity = 0;
    }
    const mouseOut = (e) => {
        e.target.style.opacity = 1;
    }

    const index = props.itemIndex

    return (
        <Link to={`/${props.navItem}/${props.item.code}`} state={{index}}>
            <div className={classes.item}>
                <img onMouseOver={mouseOver} onMouseOut={mouseOut} src={`/images/item${props.item.id}/img1.jpg`} alt="item" className={classes.item__img + " " + classes.item__img_1} />
                <img onMouseOver={mouseOver} onMouseOut={mouseOut} src={`/images/item${props.item.id}/img2.jpg`} alt="item" className={classes.item__img + " " + classes.item__img_2} />
                <h2 className={classes.item__name}>{props.item.name}</h2>
                <p className={classes.item__type}>{props.item.type}</p>
                <p className={classes.item__price}>{props.item.price} р.</p>
                {props.item.new ? <div className={classes.item__new}><p className={classes.item__newText}>new</p></div> : false}
            </div>
        </Link>
    );
};

export default Item;