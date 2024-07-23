import React, { useEffect, useState } from 'react';
import Layout from './../Layout/Layout';
import Home from './../Home/Home';
import Products from './../Products/Products';
import Cart from './../Cart/Cart';
import WishList from './../WishList/WishList';
import Allorders from './../Allorders/Allorders';
import Details from './../Details/Details';
import Categories from './../Categories/Categories';
import Brands from './../Brands/Brands';
import Login from './../Login/Login';
import Register from './../Register/Register';
import NotFound from './../NotFound/NotFound';
import Profile from '../Profile/Profile';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import { Navigate, RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function App ()
{

  // {}
  const [ loggedInUser, setLoggedInUser ] = useState( null );

  function getData ()
  {
    const token = localStorage.getItem( 'token' );
    if ( token )
    {
      const decodedToken = jwtDecode( token );
      setLoggedInUser( decodedToken );
    } else
    {
      setLoggedInUser( null );
    }
  }

  function logOut ()
  {
    localStorage.removeItem( 'token' );
    setLoggedInUser( null );
    <Navigate to={ '/login' } />;
  }

  useEffect( () => getData(), [] );
  

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={ <Layout loggedInUser={ loggedInUser } logOut={ logOut } /> }>
          <Route index element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="products" element={
            <ProtectedRoute>
              <Products/>
            </ProtectedRoute>
          } />
          <Route path="brands" element={
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          } />
          <Route path="categories" element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          } />
          <Route path="details/:id" element={
            <ProtectedRoute>
              <Details/>
            </ProtectedRoute>
          } />
          <Route path="allorders" element={
            <ProtectedRoute>
              < Allorders />
            </ProtectedRoute>
          } />
          <Route path="wishlist" element={
            <ProtectedRoute>
              < WishList />
            </ProtectedRoute>
          } />
          <Route path="cart" element={
            <ProtectedRoute>
              < Cart />
            </ProtectedRoute>
          } />
          <Route path="profile" element={
            <ProtectedRoute>
              <Profile loggedInUser={ loggedInUser } />
            </ProtectedRoute>
          } />
          <Route path="login" element={ <Login getData={ getData } /> } />
          <Route path="register" element={ <Register /> } />
          <Route path="*" element={ <NotFound /> } />
        </Route>
      </>
    )
  );



  return <RouterProvider router={ routes } />;
}
