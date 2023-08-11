import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ScrollToTopPage } from './contexts/ScrollToTopPage';
import UserProvider from './contexts/userProvider';
import icon from "./images/icon.svg";


import './index.css';


const Recipe = lazy(() => import('./pages/Recipe/index'));
const Home = lazy(() => import('./pages/Home/Home'));
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


function IconTemSabor() {
  return (
    <div className='w-screen h-screen grid place-items-center bg-white'>
      <img className="w-1/2 md:w-1/4" src={icon} alt={"Icone da Tem sabor"} />
    </div>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <ScrollToTopPage />
        <Routes>
          <Route path='/' element={<Suspense fallback={<IconTemSabor />}><Home /></Suspense>} />
          <Route path='/home' element={<Suspense fallback={<IconTemSabor />} ><Home /></Suspense>} />
          <Route path='/receitas/:slug' element={<Suspense fallback={<IconTemSabor />} ><Recipe /></Suspense>} />
          <Route path='/store' element={<Suspense fallback={<IconTemSabor />} ><Store /></Suspense>} />
          <Route path='/poll' element={<Suspense fallback={<IconTemSabor />} ><Poll /></Suspense>} />
          <Route path='/login' element={<Suspense fallback={<IconTemSabor />} ><Login /></Suspense>} />
          <Route path='/register' element={<Suspense fallback={<IconTemSabor />} ><Login /></Suspense>} />
          <Route path='/create' element={<Suspense fallback={<IconTemSabor />} ><CreateRecipe /></Suspense>} />
          <Route path='/create-tip' element={<Suspense fallback={<IconTemSabor />} ><CreateTip /></Suspense>} />
          <Route path='/about' element={<Suspense fallback={<IconTemSabor />} ><About /></Suspense>} />
          <Route path='/contact' element={<Suspense fallback={<IconTemSabor />} ><Contact /></Suspense>} />
          <Route path='/tip/:name/:id' element={<Suspense fallback={<IconTemSabor />} ><Tip /></Suspense>} />
          <Route path='/category/:sub' element={<Suspense fallback={<IconTemSabor />} ><Category /></Suspense>} />
          <Route path='/panel-user' element={<Suspense fallback={<IconTemSabor />} ><PanelUser /></Suspense>} />
          <Route path='/terms' element={<Suspense fallback={<IconTemSabor />} ><Policy /></Suspense>} />
          <Route path='/policy' element={<Suspense fallback={<IconTemSabor />} ><Policy /></Suspense>} />
          <Route path='*' element={<Suspense fallback={<IconTemSabor />} ><NotFound /></Suspense>} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);
