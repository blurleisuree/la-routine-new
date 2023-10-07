import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './styles/App.css';

import Main from './pages/Main/Main.jsx';
import Faq from './pages/Faq/Faq.jsx'
import Error from './pages/Error/Error.jsx';
import ItemCard from './components/ItemCard/ItemCard.jsx';

import Catalog from './components/Catalog/Catalog.jsx';

function App() {

  const [navItems, setNavItems] = useState(null);

  useEffect(() => {
    fetchCatalog()
  }, []);

  async function fetchCatalog() {
    const res = await fetch('http://localhost:3001/catalog');
    const json = await res.json();
    setNavItems(json);
  }

  const [basket, setBasket] = useState([{
    item: { _id: "ObjectId('650c77a3f5fdc020eb0ca1d3')", name: 'La Routine Tee "RED GIRL"', type: 'Tee / Photo', price: '2 690', code: 'red-girl', catalog_id: "ObjectId('6509fbe4e0c959f228fe60ca')" },
    params: { color: 'white', size: 'L' },
  }, {item: {price: '4 560'}}, {item: {price: '12 450'}}]);

  // const updateBascke = (item, params) {
  //   setBasket([...basket, item])
  // }

  return (
    !navItems
      ? <p>Is Loading...</p>
      : <div className="App">
        <BrowserRouter>
          <Routes >
            <Route path='/' element={<Main navItems={navItems} basket={basket} />}>
              <Route index element={<Catalog />} />
              {navItems.map((navItem, index) =>
                <Route path={'/' + navItem.name} key={navItem._id} element={< Catalog navItem={navItem.name} />}>
                  <Route path=':id' element={<ItemCard navItem={navItem} />} />
                </Route>
              )}
              <Route path='/faq' element={<Faq />} />
              <Route path='*' element={<Error />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div >
  );
}

export default App;

// db.items.insertOne(
//   {
//     name: '',
//     type: '',
//     price: '',
//     sizes: [],
//     colors: [],
//     code: '',
//     new: ,
//     imgs_count: ,
//     catalog_id: ObjectId(),
// available: ,
//   }
// )

// db.items.insertMany([
//   {
//     name: 'La Routine Bag',
//     type: 'Black / Logo',
//     price: '5 990',
//     sizes: [],
//     colors: [],
//     code: 'T3-Nylon',
//     new: true,
//     catalog_id: ObjectId('6509fbe4e0c959f228fe60d0'),
//     available: false,
//     description: 'Bag - Нейлон;Logo- Рефлективная сумка;ㅤ;Вместимость ≈ 1.9 Л;ㅤ;Замеры;ㅤ;длина;27,5 см;ширина;9,5 см;высота;20 см;ㅤ;Сроки отправки данной сумки 2-4 недели',
//     imgs: [{ n: 1 }, { n: 2 }, { n: 3 }, { n: 4 }, { n: 5 }, { n: 6 }, { n: 7 }, { n: 8 }, { n: 9 }, { n: 10 }],
//   }
// ])