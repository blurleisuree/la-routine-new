import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import classes from './ItemCard.module.css';

import InfoBlock from '../../components/UI/InfoBlock/InfoBlock.jsx';
import Tabs from '../../components/UI/Tabs/Tabs.jsx';
import ImgCarousel from "../../components/UI/ImgCarousel/ImgCarousel.jsx";

import serverUrl from '../../data/serverUrl.js';

const ItemCard = ({ navItem }) => {

    // Загрузка item'a
    const [item, setItems] = useState(null);
    const pathname = useLocation().pathname;
    async function fetchItems() {
        const res = await fetch(serverUrl + pathname);
        const json = await res.json()
        setItems(json)
    }

    // Проверка на предыдущий каталог (для кнопок "назад")
    const [isNew, setIsNew] = useState(false);
    const navState = useLocation().state;
    let url;
    isNew
        ? url = '/'
        : url = '..'

    useEffect(() => {
        fetchItems();
        if (navState) {
            setIsNew(navState.isNew)
        }
    }, []);

    // Для кнопок "назад" + анимация выхода
    const navigate = useNavigate();
    const [redirectIsActive, setRedirectIsActive] = useState(false);
    const redirect = () => {
        setRedirectIsActive(true);
        setTimeout(() => navigate(url, { state: { active: true } }), 370)
    }

    // Состояние выбранных параметров товара (цвет + размер)
    const [params, setParams] = useState(null)
    useEffect(() => {
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

    const changeColor = (color) => {
        setParams({
            ...params,
            color: color,
        });
    };

    const addItemToBasket = useOutletContext();

    return (
        <div className={classes.itemCard} style={{ minHeight: document.body.scrollHeight }}>
            {item && params &&
                <Helmet >
                    <title>{item.name}</title>
                    <link rel="icon" href="../imgs/favicons/favicon.ico" sizes="any" />
                </Helmet>
            }
            <div className={classes.itemCard__top} onClick={redirect}>
                <div className={classes.itemCard__more}>
                    <span>←</span>
                    <p>More products</p>
                </div>
                <img src="/imgs/icons/cross.svg" alt="cross" className={classes.itemCard__cross} />
            </div>
            {item && params &&
                <div className={redirectIsActive ? classes.itemCard__wrapper + " " + classes.redirect : classes.itemCard__wrapper}>
                    <div className={classes.itemCard__inner}>
                        <ImgCarousel
                            item={item}
                            navItemName={navItem.name}
                            changeColor={changeColor}
                            activeColor={params.color}
                        />
                        <InfoBlock
                            item={item}
                            selectOption={selectOption}
                            params={params}
                            desc={navItem.description}
                            addItemToBasket={addItemToBasket}
                            redirect={redirect}
                        />
                    </div>
                    {/* Параметр указывающийся в бд для отображения размерной сетки */}
                    {navItem.sizesVisible && < Tabs />}
                </div>
            }
        </div >
    );
};

export default ItemCard;