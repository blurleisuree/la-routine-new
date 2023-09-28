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

  return (
    !navItems
      ? <p>Is Loading...</p>
      : <div className="App">
        <BrowserRouter>
          <Routes >
            <Route path='/' element={<Main navItems={navItems} />}>
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
//     name: 'LA ROUTINE MAGAZINE',
//     type: 'Version 2023',
//     price: '2 500',
//     sizes: [],
//     colors: [],
//     code: 'magazine',
//     new: false,
//     imgs_count: 8,
//     catalog_id: ObjectId('6509fbe4e0c959f228fe60cf'),
//     available: true,
//     description: 'LA ROUTINE MAGAZINE 2023;ㅤ;2016 - 2023;ㅤ;А4 Portrait Style Book.;ㅤ;150 Pages.'
//   },
//   {
//     name: 'PostCard',
//     type: 'Index-Print',
//     price: '300',
//     sizes: [],
//     colors: [],
//     code: 'card',
//     new: false,
//     imgs_count: 8,
//     catalog_id: ObjectId('6509fbe4e0c959f228fe60cf'),
//     available: true,
//     description: '- Размер А6.;ㅤ;-Рандом карточки;ㅤ;- В комплекте 5 индес принтов.;ㅤ;- Сделаны из картона.'
//   },
//   {
//     name: 'Photo',
//     type: '30 x 40',
//     price: '2 500',
//     sizes: [],
//     colors: [],
//     code: 'photo',
//     new: false,
//     imgs_count: 1,
//     catalog_id: ObjectId('6509fbe4e0c959f228fe60cf'),
//     available: false,
//     description: '- Размер 30см на 40см.;ㅤ;- В комплекте 1 фотография и рамка.;ㅤ;- Является объектом домашнего декора.'
//   },
// ])