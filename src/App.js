import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './Page/HomePage';
import MainPage from './Page/MainPage';
import ProductPage from './Page/ProductPage';
import ProductDetailPage from './Page/ProductDetailPage';
import AdminHomePage from './Page/Admin/AdminHomePage';
import Category from './Page/Admin/Category/Category';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/'>
            <Route index element={<HomePage />}></Route>
            <Route path='main' element={<MainPage />}></Route>
            <Route path='product' >
              <Route index element={<ProductPage />}></Route>
              <Route path='details' element={<ProductDetailPage />}></Route>
            </Route>
            <Route path='admin'>
              <Route index element={<AdminHomePage />}></Route>
              <Route path='category' element={<Category />}></Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
