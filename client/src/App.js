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
//     name: 'Sling "MY LIFE IS"',
//     type: 'Black',
//     price: '490',
//     sizes: [],
//     colors: ['Black'],
//     code: 'sling',
//     new: true,
//     catalog_id: ObjectId('6509fbe4e0c959f228fe60d1'),
//     available: false,
//     description: 'One Size;ㅤ;Максимальная длина: 1,5 метра.',
//     imgs: [{n: 1, color: 'black'}, {n: 2, color: 'black'}],
//   },
// ])