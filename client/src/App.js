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
    const json = await res.json()
    setNavItems(json)
  }

  return (
    !navItems
      ? <p>Is Loading...</p>
      : <div className="App">
        <BrowserRouter>
          <Routes >
            <Route path='/' element={<Main navItems={navItems} />}>
              <Route index element={<Catalog itemIndex={0} />} />
              {navItems.map((navItem, index) =>
                <Route path={'/' + navItem.name} element={<Catalog navItem={navItem.name} />}>
                  <Route path=':id' element={<ItemCard />} />
                </Route>
              )}
              <Route path='/faq' element={<Faq />} />
              <Route path='*' element={<Error />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;

// db.items.insertMany([
//   {
//     name: '',
//     type: '',
//     price: '',
//     description: '',
//     sizes: [],
//     colors: [],
//     code: '',
//     new: ,
//     imgs: [],
//     catalog_id: ObjectId()
//   }
// ])