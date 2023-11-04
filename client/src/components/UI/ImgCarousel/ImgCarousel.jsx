import React, { useState, useEffect } from "react";

import classes from './ImgCarousel.module.css';

import ImgComponent from "../ImgComponent/ImgComponent.jsx";

const ImgCarousel = ({ item, navItemName, changeColor, activeColor }) => {

    const [imgActiveIndex, setImgActiveIndex] = useState(1);
    const [imgsCount, setImgsCount] = useState(item.imgs.length);

    // На случай если картинка размерной сетки не предусмотрена
    const disableSizesImg = (e) => {
        e.target.style.display = 'none';
        setImgsCount(imgsCount - 1);
    };

    // Изменение params.color от активной картинки
    useEffect(() => {
        setTimeout(() => {
            const imgActive = item.imgs[imgActiveIndex - 1];
            imgActive && activeColor !== imgActive.color && changeColor(imgActive.color);
        }, 0) // Не знаю как это работает но ошибка пропадает
    }, [imgActiveIndex]);

    // Изменение картинки от params.color + первая проверка чтобы с размерной сетки менялся
    useEffect(() => {
        const imgActive = item.imgs[imgActiveIndex - 1];
        if (imgActive) {
            if (activeColor !== imgActive.color) {
                // Если в db color указан как "" (если без этого imgActiveIndex ломается)
                if (activeColor === "") {
                    return
                }
                const even = (el) => {
                    return el.color === activeColor
                }
                const index = item.imgs.findIndex(even) + 1
                setImgActiveIndex(index)
            }
        } else {
            const even = (el) => {
                return el.color === activeColor
            }
            const index = item.imgs.findIndex(even) + 1
            setImgActiveIndex(index)
        };
    }, [activeColor]);

    return (
        <div className={classes.imgCarousel}>
            <div className={classes.imgCarousel__inner}>
                <div onClick={() => setImgActiveIndex(imgActiveIndex - 1)} className={imgActiveIndex === 1 ? classes.imgCarousel__arrow + " " + classes.imgCarousel__arrow_left : classes.imgCarousel__arrow + " " + classes.imgCarousel__arrow_left + " " + classes.active}>
                    <img src="/imgs/icons/arrow.svg" alt="svg" />
                </div>
                {item.imgs.map((img) =>
                    <ImgComponent
                        key={img.n}
                        alt="mainImg"
                        src={`/imgs/items/${item._id}_img${img.n}.jpg`}
                        active={img.n === imgActiveIndex}
                    />
                )}
                <ImgComponent
                    alt="mainSizes"
                    src={`/imgs/general/${navItemName}_sizes.jpg`}
                    onError={(e) => disableSizesImg(e)}
                    active={imgsCount + 1 === imgActiveIndex}
                /> 
                <div onClick={() => setImgActiveIndex(imgActiveIndex + 1)} className={imgsCount + 1 === imgActiveIndex ? classes.imgCarousel__arrow + " " + classes.imgCarousel__arrow_right : classes.imgCarousel__arrow + " " + classes.imgCarousel__arrow_right + " " + classes.active}>
                    <img src="/imgs/icons/arrow.svg" alt="svg" />
                </div>
            </div>
            {item.imgs.length > 1 &&
                <div className={classes.imgCarousel__mini}>
                    {item.imgs.map((img, index) =>
                        <ImgComponent
                            key={index}
                            alt="miniImg"
                            src={`/imgs/items/${item._id}_img${img.n}.jpg`}
                            onClick={() => setImgActiveIndex(img.n)}
                            active={img.n === imgActiveIndex}
                            mini={true}
                        />
                    )}
                    <ImgComponent
                        alt="miniSizes"
                        src={`/imgs/general/${navItemName}_sizes.jpg`}
                        onError={(e) => disableSizesImg(e)}
                        onClick={() => setImgActiveIndex(imgsCount + 1)}
                        active={imgsCount + 1 === imgActiveIndex}
                        mini={true}
                    />
                </div>
            }
        </div>
    );
};

export default ImgCarousel;