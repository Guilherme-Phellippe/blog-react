import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Loading } from './components/atoms/Loading/Loading';
import { ScrollToTopPage } from './contexts/ScrollToTopPage';

import { ReactComponent as LogoSvg } from './image/logo-temsabor.svg';

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

function Logo() {
  return (
    <div className='w-screen h-screen grid place-content-center bg-white'>
      <LogoSvg />
      <div className='relative'><Loading /></div>
    </div>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTopPage />
      <Routes>
        <Route path='/' element={<Suspense fallback={<Logo />}><Home /></Suspense>} />
        <Route path='/home' element={<Suspense fallback={<Logo />} ><Home /></Suspense>} />
        <Route path='/recipe/:name/:id' element={<Suspense fallback={<Logo />} ><Recipe /></Suspense>} />
        <Route path='/store' element={<Suspense fallback={<Logo />} ><Store /></Suspense>} />
        <Route path='/poll' element={<Suspense fallback={<Logo />} ><Poll /></Suspense>} />
        <Route path='/login' element={<Suspense fallback={<Logo />} ><Login /></Suspense>} />
        <Route path='/register' element={<Suspense fallback={<Logo />} ><Login /></Suspense>} />
        <Route path='/create' element={<Suspense fallback={<Logo />} ><CreateRecipe /></Suspense>} />
        <Route path='/create-tip' element={<Suspense fallback={<Logo />} ><CreateTip /></Suspense>} />
        <Route path='/about' element={<Suspense fallback={<Logo />} ><About /></Suspense>} />
        <Route path='/contact' element={<Suspense fallback={<Logo />} ><Contact /></Suspense>} />
        <Route path='/tip/:name/:id' element={<Suspense fallback={<Logo />} ><Tip /></Suspense>} />
        <Route path='/category/:sub' element={<Suspense fallback={<Logo />} ><Category /></Suspense>} />
        <Route path='/panel-user' element={<Suspense fallback={<Logo />} ><PanelUser /></Suspense>} />
        <Route path='/terms' element={<Suspense fallback={<Logo />} ><Policy /></Suspense>} />
        <Route path='/policy' element={<Suspense fallback={<Logo />} ><Policy /></Suspense>} />
        <Route path='*' element={<Suspense fallback={<Logo />} ><NotFound /></Suspense>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
