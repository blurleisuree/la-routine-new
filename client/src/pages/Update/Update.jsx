import React, { useState, useEffect } from "react";

import classes from './Update.module.css';

const Update = () => {

    const [item, setItem] = useState({
        name: "",
        new: "",
        available: "",
        code: "",
        price: "",
        type: "",
        catalog_id: "",
        sizes: "",
        colors: "",
        imgs: "",
        description: '',
    })

    const toRightTypes = () => {
        const sizes = item.sizes.split(',')
        const colors = item.colors.split(',')
        const itemNew = Number(item.new);
        const available = Number(item.available);

        let imgs = item.imgs.split(',')
        imgs = imgs.map((color, i) => {
            if (color.match(/[0-9]/)) {
                return { n: i + 1 }
            } else {
                return { n: i + 1, color: color }
            }
        })

        const newItem = { ...item, sizes: sizes, colors: colors, imgs: imgs, new: itemNew, available: available }
        setItem({ ...item, name: '', code: '', new: '' })
        return newItem
    }

    async function addItems() {
        const res = await fetch(`http://localhost:3001/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(toRightTypes()),
        });
        const json = await res.json()
        console.log(json)
    }

    const updateField = (e) => {
        const name = e.target.name
        const value = e.target.value
        setItem({ ...item, [name]: value })
    }

    return (
        <div className={classes.update}>
            <input type="text" value={item.name} onChange={(e) => updateField(e)} placeholder="name" name="name" />
            <input type="text" value={item.new} onChange={(e) => updateField(e)} placeholder="new (0/1)" name="new" />
            <input type="text" value={item.available} onChange={(e) => updateField(e)} placeholder="available (0/1)" name="available" />
            <input type="text" value={item.code} onChange={(e) => updateField(e)} placeholder="code" name="code" />
            <input type="text" value={item.price} onChange={(e) => updateField(e)} placeholder="price" name="price" />
            <input type="text" value={item.type} onChange={(e) => updateField(e)} placeholder="type" name="type" />
            <input type="text" value={item.catalog_id} onChange={(e) => updateField(e)} placeholder="catalog_id" name="catalog_id" />
            <input type="text" value={item.sizes} onChange={(e) => updateField(e)} placeholder="sizes" name="sizes" />
            <input type="text" value={item.colors} onChange={(e) => updateField(e)} placeholder="colors" name="colors" />
            <input type="text" value={item.imgs} onChange={(e) => updateField(e)} placeholder="imgs" name="imgs" />
            <input type="text" value={item.description} onChange={(e) => updateField(e)} placeholder="description" name="description" />
            <button className={classes.btn} onClick={addItems}>add</button>
        </div>
    );
};

export default Update;