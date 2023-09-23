import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import data from './data/items.json';

import './styles/App.css';

import Main from './pages/Main/Main.jsx';
import Faq from './pages/Faq/Faq.jsx'
import Error from './pages/Error/Error.jsx';
import ItemCard from './pages/ItemCard/ItemCard.jsx';

import Catalog from './components/Catalog/Catalog.jsx';

function App() {
  // let navItems = ['t-shirt', 'longSleeve', 'hoodie', 'zip-hoodie', 'shorts', 'magazine', 'bags', "accessories", 'box', 'faq'];
  // const [items, setItems] = useState(data)

  const [navItems, setNavItems] = useState(null);

  useEffect(() => {
    fetchCatalog()
  }, []);

  console.log(typeof navItems)

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
              <Route index element={<Catalog navItem={'new'} itemIndex={0} />} />

              {/* {navItems.map((navItem, index) =>
              navItem == 't-shirt'
                ? console.log()
                : navItems == 'zip-hoodie'
                  ? <Route path='/zipHoodie' element={<Catalog itemIndex={index} navItem={navItem} />} />
                  : navItem == "faq"
                    ? <Route path={'/' + navItem} element={<Faq />} />
                    : <Route path={'/' + navItem} element={<Catalog itemIndex={index} navItem={navItem} />} />
            )} */}

              <Route path='*' element={<Error />} />
            </Route>
            {/* {navItems.map((navItem, index) =>
            navItem == 'zip-hoodie'
              ? <Route path='/zipHoodie/:id' element={<ItemCard navItem={navItem} itemIndex={index} items={items} />} />
              : navItem == 'faq'
                ? console.log()
                : <Route path={`/${navItem}/:id`} element={<ItemCard navItem={navItem} itemIndex={index} items={items} />} />
          )} */}
          </Routes>
        </BrowserRouter>
      </div>
  );

  // return (
  //   <div className="App">
  //     <BrowserRouter>
  //       <Routes >
  //         <Route path='/' element={<Main navItems={navItems} items={items} />}>
  //           <Route index element={<Catalog navItem={'t-shirt'} itemIndex={0} />} />

  //           {navItems.map((navItem, index) =>
  //             navItem == 't-shirt'
  //               ? console.log()
  //               : navItems == 'zip-hoodie'
  //                 ? <Route path='/zipHoodie' element={<Catalog itemIndex={index} navItem={navItem} />} />
  //                 : navItem == "faq"
  //                   ? <Route path={'/' + navItem} element={<Faq />} />
  //                   : <Route path={'/' + navItem} element={<Catalog itemIndex={index} navItem={navItem} />} />
  //           )}

  //           <Route path='*' element={<Error />} />
  //         </Route>
  //         {navItems.map((navItem, index) =>
  //           navItem == 'zip-hoodie'
  //             ? <Route path='/zipHoodie/:id' element={<ItemCard navItem={navItem} itemIndex={index} items={items} />} />
  //             : navItem == 'faq'
  //               ? console.log()
  //               : <Route path={`/${navItem}/:id`} element={<ItemCard navItem={navItem} itemIndex={index} items={items} />} />
  //         )}
  //       </Routes>
  //     </BrowserRouter>
  //   </div>
  // );
}

export default App;
