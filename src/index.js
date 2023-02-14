import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ScrollToTopPage } from './contexts/ScrollToTopPage';
import Home from './pages/Home/Home';
import { NotFound } from './pages/NotFound/NotFound';
import { Store } from './pages/Store/Store';
import { Recipe } from './pages/Recipe';
import { Poll } from './pages/Poll/Poll';
import { Login } from './pages/Login/Login'
import { CreateRecipe } from './pages/CreateRecipe/CreateRecipe';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTopPage />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/store' element={<Store />} />
        <Route path='/recipe/:id' element={<Recipe />} />
        <Route path='/poll' element={<Poll />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Login />} />
        <Route path='/create' element={<CreateRecipe />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);