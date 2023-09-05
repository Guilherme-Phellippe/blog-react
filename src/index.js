import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ScrollToTopPage } from './contexts/ScrollToTopPage';
import UserProvider from './contexts/userProvider';
import LoadingInput from './components/atoms/Loading/LoadingInput';


import './index.css';
import CursoBoloDePote from './pages/StaticPages/CourseCakeInPot/CursoBoloDePote';


const Recipe = lazy(() => import('./pages/Recipe/index'));
const Home = lazy(() => import('./pages/Home/Home'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));
const Product = lazy(() => import('./pages/Product/Product'));
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
const Whatsapp = lazy(() => import('./pages/Whatsapp/index'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <ScrollToTopPage />
        <Routes>
          <Route path='/' element={<Suspense fallback={<LoadingInput />}><Home /></Suspense>} />
          <Route path='/home' element={<Suspense fallback={<LoadingInput />} ><Home /></Suspense>} />
          <Route path='/receitas/:slug' element={<Suspense fallback={<LoadingInput />} ><Recipe /></Suspense>} />
          <Route path='/produto' element={<Suspense fallback={<LoadingInput />} ><Product /></Suspense>} />
          <Route path='/poll' element={<Suspense fallback={<LoadingInput />} ><Poll /></Suspense>} />
          <Route path='/login' element={<Suspense fallback={<LoadingInput />} ><Login /></Suspense>} />
          <Route path='/register' element={<Suspense fallback={<LoadingInput />} ><Login /></Suspense>} />
          <Route path='/create' element={<Suspense fallback={<LoadingInput />} ><CreateRecipe /></Suspense>} />
          <Route path='/create-tip' element={<Suspense fallback={<LoadingInput />} ><CreateTip /></Suspense>} />
          <Route path='/about' element={<Suspense fallback={<LoadingInput />} ><About /></Suspense>} />
          <Route path='/contact' element={<Suspense fallback={<LoadingInput />} ><Contact /></Suspense>} />
          <Route path='/tip/:name/:id' element={<Suspense fallback={<LoadingInput />} ><Tip /></Suspense>} />
          <Route path='/category/:sub' element={<Suspense fallback={<LoadingInput />} ><Category /></Suspense>} />
          <Route path='/panel-user' element={<Suspense fallback={<LoadingInput />} ><PanelUser /></Suspense>} />
          <Route path='/terms' element={<Suspense fallback={<LoadingInput />} ><Policy /></Suspense>} />
          <Route path='/policy' element={<Suspense fallback={<LoadingInput />} ><Policy /></Suspense>} />
          <Route path='*' element={<Suspense fallback={<LoadingInput />} ><NotFound /></Suspense>} />
          <Route path='/whatsapp' element={<Whatsapp />} />
          <Route path='/historia-da-julia-galvao' element={<Suspense fallback={<LoadingInput />} ><CursoBoloDePote /></Suspense>} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);
