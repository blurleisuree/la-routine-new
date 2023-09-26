import React, { useState } from "react";

import classes from './ImgCarousel.module.css';

const ImgCarousel = (props) => {

    const item = props.item;

    // const imgsLength = item.imgs.length;

    let [imgActive, setImgActive] = [props.imgActive, props.setImgActive];

    const arr = []
    for (let i = 1; i < props.item.imgs_count; i++) {
        arr.push(i)
    }

    return (
        <div className={classes.imgCarousel}>
            <div className={classes.imgCarousel__inner}>
                <div onClick={() => setImgActive(imgActive - 1)} className={imgActive == 0 ? classes.imgCarousel__arrow + " " + classes.imgCarousel__arrow_left : classes.imgCarousel__arrow + " " + classes.imgCarousel__arrow_left + " " + classes.active}><svg viewBox="0 0 7.3 13">
                    <desc>Left</desc>
                    <polyline fill="none" stroke="#000000" stroke-linejoin="butt" stroke-linecap="butt" stroke-width="1" points="0.5,0.5 6.5,6.5 0.5,12.5"></polyline>
                </svg></div>
                {arr.map((i) =>
                    <img src={`/imgs/items/${props.item._id}_img${i}`} className={imgActive == i ? classes.imgCarousel__img + ' ' + classes.active : classes.imgCarousel__img}></img>
                )}
                {/* {item.imgs.map((img, index) =>
                    <img src={img.src} className={imgActive == index ? classes.imgCarousel__img + ' ' + classes.active : classes.imgCarousel__img} />
                )} */}
                <div onClick={() => setImgActive(imgActive + 1)} className={imgActive == props.item.imgs_count - 1 ? classes.imgCarousel__arrow + " " + classes.imgCarousel__arrow_right : classes.imgCarousel__arrow + " " + classes.imgCarousel__arrow_right + " " + classes.active}><svg viewBox="0 0 7.3 13">
                    <desc>Right</desc>
                    <polyline fill="none" stroke="#000000" stroke-linejoin="butt" stroke-linecap="butt" stroke-width="1" points="0.5,0.5 6.5,6.5 0.5,12.5"></polyline>
                </svg></div>
            </div>
            <div className={classes.imgCarousel__mini}>
                {arr.map((i) =>
                    <img src={`/imgs/items/${props.item._id}_img${i}`} onClick={() => setImgActive(i)} className={i == imgActive ? classes.imgCarousel__imgMini + " " + classes.active : classes.imgCarousel__imgMini} />
                )}
            </div>
        </div>
    );
};

export default ImgCarousel;