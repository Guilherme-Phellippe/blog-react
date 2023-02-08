import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home/Home';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotFound } from './pages/NotFound/NotFound';
import { Store } from './pages/Store/Store';
import { Recipe } from './pages/Recipe';
import { Poll } from './pages/Poll/Poll';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/store' element={<Store />} />
        <Route path='/recipe/:id' element={<Recipe />} />
        <Route path='/poll' element={<Poll />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);