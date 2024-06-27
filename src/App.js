import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './Page/HomePage';
import MainPage from './Page/MainPage';
import ProductPage from './Page/Product/ProductPage';
import ProductDetailPage from './Page/Product/ProductDetailPage';
import AdminHomePage from './Page/Admin/AdminHomePage';
import AdminOrderPage from './Page/Admin/Order/AdminOrderPage';
import BrandPage from './Page/Admin/Brand/BrandPage';
import AdminProductPage from './Page/Admin/Product/AdminProductPage';
import AddAdminProductPage from './Page/Admin/Product/AddAdminProductPage'
import LoginPage from './Page/Auth/LoginPage';
import SignUpPage from './Page/Auth/SignUpPage';
import AccountPage from './Page/Users/AccountPage';
import OrdersPage from './Page/Users/OrdersPage';
import ViewCart from './Page/Users/ViewCart';
import Test from './Page/Test';
import UserProtectedRoutes from './Utils/UserProtectedRoutes';
import AdminProtectedRoutes from './Utils/AdminProtectedRoutes';
import PageNotFound from './Page/PageNotFound';
import CheckOutPage from './Page/Users/CheckOutPage';


function App() {


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/'>
            <Route path="*" element={<PageNotFound />}></Route>
            <Route index element={<HomePage />}></Route>
            <Route path="test" element={<Test />}></Route>
            <Route path='main' element={<MainPage />}></Route>
            <Route path='login'>
              <Route index element={<LoginPage />}></Route>
              <Route path=":any" element={<LoginPage />}></Route>
            </Route>
            <Route path='signup' element={<SignUpPage />}></Route>
            <Route element={<UserProtectedRoutes />}>
              <Route path="u">
                <Route path='viewcart' element={<ViewCart />}></Route>
                <Route path='checkout' element={<CheckOutPage />}></Route>
                <Route path='account'>
                  <Route index element={<AccountPage />}></Route>
                  <Route path="orders" element={<OrdersPage />}></Route>
                </Route>
              </Route>
            </Route>
            <Route path='product' >
              <Route index element={<ProductPage />}></Route>
              <Route path='details/:id' element={<ProductDetailPage />}></Route>
            </Route>
            <Route element={<AdminProtectedRoutes />}>
              <Route path='admin'>
                <Route index element={<AdminHomePage />}></Route>
                <Route path='order' element={<AdminOrderPage />}></Route>
                <Route path='brand'>
                  <Route index element={<BrandPage />}></Route>
                </Route>
                <Route path='product'>
                  <Route index element={<AdminProductPage />}></Route>
                  <Route path='add' element={<AddAdminProductPage />}></Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
