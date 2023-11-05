import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './styles/App.css';

import Main from './pages/Main/Main.jsx';
import Faq from './pages/Faq/Faq.jsx'
import Error from './pages/Error/Error.jsx';
import ItemCard from './components/ItemCard/ItemCard.jsx';
// import Update from './pages/Update/Update.jsx';

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

  const [overlayIsActive, setOverlayIsActive] = useState(false);
  const [isClickedOnOverlay, setIsClickedOnOverlay] = useState(false);
  const disableAnOverlay = () => {
    setOverlayIsActive(false);
    setIsClickedOnOverlay(true);
  }

  return (
    !navItems
      ? <p>Is Loading...</p>
      : <div className="App">
        <div className={`overlay ${overlayIsActive}`} onClick={(e) => disableAnOverlay(e)}></div>
        <BrowserRouter>
          <Routes >
            <Route path='/'
              element={
                <Main
                  navItems={navItems}
                  setOverlayIsActive={setOverlayIsActive}
                  isClickedOnOverlay={isClickedOnOverlay}
                  setIsClickedOnOverlay={setIsClickedOnOverlay}
                />
              }
            >
              <Route index element={<Catalog />} />
              {navItems.map((navItem, index) =>
                <Route path={'/' + navItem.name} key={navItem._id} element={< Catalog navItem={navItem.name} />}>
                  <Route path=':id' element={<ItemCard navItem={navItem} />} />
                </Route>
              )}
              <Route path='/faq' element={<Faq />} />
              <Route path='*' element={<Error />} />
            </Route>
            {/* Интерфейс для добавления новых товаров */}
            {/* <Route path='/update' element={<Update />} /> */}
          </Routes>
        </BrowserRouter>
      </div >
  );
}

export default App;