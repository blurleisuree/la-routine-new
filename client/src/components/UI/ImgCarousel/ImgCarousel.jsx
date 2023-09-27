import React, { useState } from "react";

import classes from './ImgCarousel.module.css';

const ImgCarousel = ({ item }) => {

    let [imgActive, setImgActive] = useState(1);

    const arr = []
    for (let i = 1; i <= item.imgs_count; i++) {
        arr.push(i)
    }

    return (
        <div className={classes.imgCarousel}>
            <div className={classes.imgCarousel__inner}>
                <div onClick={() => setImgActive(imgActive - 1)} className={imgActive == 1 ? classes.imgCarousel__arrow + " " + classes.imgCarousel__arrow_left : classes.imgCarousel__arrow + " " + classes.imgCarousel__arrow_left + " " + classes.active}><svg viewBox="0 0 7.3 13">
                    <desc>Left</desc>
                    <polyline fill="none" stroke="#000000" stroke-linejoin="butt" stroke-linecap="butt" stroke-width="1" points="0.5,0.5 6.5,6.5 0.5,12.5"></polyline>
                </svg></div>
                {arr.map((i) =>
                    <img src={`/imgs/items/${item._id}_img${i}.jpg`} className={i == imgActive ? classes.imgCarousel__img + ' ' + classes.active : classes.imgCarousel__img}></img>
                )}
                <div onClick={() => setImgActive(imgActive + 1)} className={item.imgs_count == imgActive ? classes.imgCarousel__arrow + " " + classes.imgCarousel__arrow_right : classes.imgCarousel__arrow + " " + classes.imgCarousel__arrow_right + " " + classes.active}><svg viewBox="0 0 7.3 13">
                    <desc>Right</desc>
                    <polyline fill="none" stroke="#000000" stroke-linejoin="butt" stroke-linecap="butt" stroke-width="1" points="0.5,0.5 6.5,6.5 0.5,12.5"></polyline>
                </svg></div>
            </div>
            <div className={classes.imgCarousel__mini}>
                {arr.map((i) =>
                    <img src={`/imgs/items/${item._id}_img${i}.jpg`} onClick={() => setImgActive(i)} className={i == imgActive ? classes.imgCarousel__imgMini + " " + classes.active : classes.imgCarousel__imgMini} />
                )}
            </div>
        </div>
    );
};

export default ImgCarousel;