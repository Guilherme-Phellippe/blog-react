import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ScrollToTopPage } from './contexts/ScrollToTopPage';

import { Loading } from './components/atoms/Loading/Loading';

import './index.css';

const Home = lazy(() => import('./pages/Home/Home'));
const Recipe = lazy(() => import('./pages/Recipe/index'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));
const Store = lazy(() => import('./pages/Store/Store'));
const Poll = lazy(() => import('./pages/Poll/Poll'));
const Login = lazy(() => import('./pages/Login/Login'));
const CreateRecipe = lazy(() => import('./pages/CreateRecipe/CreateRecipe'));
const Category = lazy(() => import('./pages/Category/Category'));
const About = lazy(() => import('./pages/About/index'));
const PanelUser = lazy(() => import('./pages/PanelUser/PanelUser'));
const Policy = lazy(() => import('./pages/Policy/Policy'));
const Tip = lazy(() => import('./pages/Tip/index'));
const CreateTip = lazy(() => import('./pages/CreateTip/index'));
const Contact = lazy(() => import('./pages/Contact/Contact'));

// Função para renderizar o conteúdo do arquivo HTML
const MyPageHTML = () => {
  return <iframe src="./stories.html" title="My Page" width="100%" height="600px" />;
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTopPage />
      <Routes>
        <Route path='/' element={<Suspense fallback={<Loading />}><Home /></Suspense>} />
        <Route path='/home' element={<Suspense fallback={<Loading />} ><Home /></Suspense>} />
        <Route path='/receitas/:slug' element={<Suspense fallback={<Loading />} ><Recipe /></Suspense>} />
        <Route path='/store' element={<Suspense fallback={<Loading />} ><Store /></Suspense>} />
        <Route path='/poll' element={<Suspense fallback={<Loading />} ><Poll /></Suspense>} />
        <Route path='/login' element={<Suspense fallback={<Loading />} ><Login /></Suspense>} />
        <Route path='/register' element={<Suspense fallback={<Loading />} ><Login /></Suspense>} />
        <Route path='/create' element={<Suspense fallback={<Loading />} ><CreateRecipe /></Suspense>} />
        <Route path='/create-tip' element={<Suspense fallback={<Loading />} ><CreateTip /></Suspense>} />
        <Route path='/about' element={<Suspense fallback={<Loading />} ><About /></Suspense>} />
        <Route path='/contact' element={<Suspense fallback={<Loading />} ><Contact /></Suspense>} />
        <Route path='/tip/:name/:id' element={<Suspense fallback={<Loading />} ><Tip /></Suspense>} />
        <Route path='/category/:sub' element={<Suspense fallback={<Loading />} ><Category /></Suspense>} />
        <Route path='/panel-user' element={<Suspense fallback={<Loading />} ><PanelUser /></Suspense>} />
        <Route path='/terms' element={<Suspense fallback={<Loading />} ><Policy /></Suspense>} />
        <Route path='/policy' element={<Suspense fallback={<Loading />} ><Policy /></Suspense>} />
        <Route path='/stories' element={<MyPageHTML />} />
        <Route path='*' element={<Suspense fallback={<Loading />} ><NotFound /></Suspense>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
