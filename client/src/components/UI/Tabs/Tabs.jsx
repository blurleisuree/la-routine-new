import React, {useState} from "react";

import classes from './Tabs.module.css';

const Tabs = () => {

    const [tabsActive, setTabsActive] = useState(0);

    return (
        <div className={classes.tabs}>
            <div className={classes.tabsTop}>
                <span className={tabsActive ? classes.tabsTop__title : classes.tabsTop__title + " " + classes.active} onClick={() => setTabsActive(0)}>Размерная сетка</span>
                <span className={tabsActive ? classes.tabsTop__title + " " + classes.active : classes.tabsTop__title} onClick={() => setTabsActive(1)}>Рекомендации по стирке</span>
            </div>
            <div className={tabsActive ? classes.tabsContent : classes.tabsContent + " " + classes.active}>
                <div className={classes.tabsContent__item}>
                    <p className={classes.tabsContent__title}>Белые/чёрные:</p>
                    <p className={classes.tabsContent__text}><span className={classes.tabsContent__text_size}>S</span> — 160-170 (рост, см), 68 (длина от горла), 24,5 (длина рукава), 56 (ширина)</p>
                    <p className={classes.tabsContent__text}><span className={classes.tabsContent__text_size}>M</span> — 170-180 (рост, см), 70 (длина от горла), 26 (длина рукава), 58 (ширина)</p>
                    <p className={classes.tabsContent__text}><span className={classes.tabsContent__text_size}>L</span> — 180-190 (рост, см), 72 (длина от горла), 27,5 (длина рукава), 61 (ширина)</p>
                    <p className={classes.tabsContent__text}><span className={classes.tabsContent__text_size}>XL</span> — 190-200 (рост, см), 74 (длина от горла), 29 (длина рукава), 64 (ширина)</p>
                </div>
                <div className={classes.tabsContent__item}>
                    <p className={classes.tabsContent__title}>Цветные:</p>
                    <p className={classes.tabsContent__text}><span className={classes.tabsContent__text_size}>S</span> — 160-170 (рост, см), 44-46 (размер), 49 (обхват груди, см), 70 (длина, см)</p>
                    <p className={classes.tabsContent__text}><span className={classes.tabsContent__text_size}>M</span> — 170-180 (рост, см), 46-48 (размер), 52 (обхват груди, см), 72 (длина, см)</p>
                    <p className={classes.tabsContent__text}><span className={classes.tabsContent__text_size}>L</span> — 180-190 (рост, см), 48-50 (размер), 55 (обхват груди, см), 74 (длина, см)</p>
                    <p className={classes.tabsContent__text}><span className={classes.tabsContent__text_size}>XL</span> — 190-200 (рост, см), 50-52 (размер), 58 (обхват груди, см), 76 (длина, см)</p>
                </div>
            </div>
            <div className={tabsActive ? classes.tabsContent + " " + classes.active : classes.tabsContent}>
                <div className={classes.tabsContent__item}>
                    <p className={classes.tabsContent__text}>— Стирка при температуре не выше 30°.</p>
                    <p className={classes.tabsContent__text}>— Не использовать отбеливатель.</p>
                    <p className={classes.tabsContent__text}>— Стирка изделия наизнанку.</p>
                    <p className={classes.tabsContent__text}>— Гладить при средней температуре не касаясь принта. </p>
                    <p className={classes.tabsContent__text}>— Нельзя сушить в стиральной машине.</p>
                </div>
            </div>
        </div>
    );
};

export default Tabs;