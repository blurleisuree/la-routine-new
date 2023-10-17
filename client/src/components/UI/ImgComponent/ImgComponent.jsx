import React, { useEffect, useState } from "react";

import classes from './ImgComponent.module.css';

const ImgComponent = ({ alt, src, onError, onClick, mini, active }) => {

    const [componentClass, setComponentClass] = useState(null)
    useEffect(() => {
        if (mini) {
            setComponentClass(active ? classes.imgComponent_mini + " " + classes.active : classes.imgComponent_mini)
        } else {
            setComponentClass(active ? classes.imgComponent + ' ' + classes.active : classes.imgComponent)
        }
    }, [active])

    return (
        <img
            className={componentClass ? componentClass : classes.ImgComponent}
            alt={alt}
            src={src}
            onError={onError}
            onClick={onClick}
        >
        </img>
    );
};

export default ImgComponent;