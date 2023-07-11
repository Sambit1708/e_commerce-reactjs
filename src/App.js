import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './Page/HomePage';
import MainPage from './Page/MainPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/'>
            <Route index element={<HomePage />}></Route>
            <Route path='product' element={<MainPage />}></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
