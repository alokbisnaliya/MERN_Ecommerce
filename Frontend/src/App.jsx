import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './Home';
import Register from './components/Register';
import ProductListingPage from './components/ProductListingPage';
import Login from './components/Login';
import Profile from './components/Profile';
import Orders from './components/Orders';
import Product from './components/Product';
import UserCart from './components/UserCart';
import Checkout from './components/Checkout';
import { ToastContainer } from 'react-toastify';
import CancelOrder from './components/CancelOrder';
import Dashboard from './components/Dashboard';
import AdminRoute from './components/AdminRoute';
import UserRoute from './components/UserRoute';
import UserOnlyRoute from './components/UserOnlyRoute'; // ✅ NEW import
import AboutUs from './components/AboutUs';

function App() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminPath && <Header />}

      <Routes>
        <Route
          path="/"
          element={
            <UserOnlyRoute>
              <Home />
            </UserOnlyRoute>
          }
        />
        <Route
          path="/register"
          element={
            <UserOnlyRoute>
              <Register />
            </UserOnlyRoute>
          }
        />
        <Route
          path="/login"
          element={
            <UserOnlyRoute>
              <Login />
            </UserOnlyRoute>
          }
        />
        <Route
          path="/products/:category"
          element={
            // <UserRoute>
              <UserOnlyRoute>
                <ProductListingPage />
              </UserOnlyRoute>
            // </UserRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <UserRoute>
              <Profile />
            </UserRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <UserRoute>
              <Orders />
            </UserRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <UserOnlyRoute>
              <Product />
            </UserOnlyRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <UserOnlyRoute>
              <UserCart />
            </UserOnlyRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <UserOnlyRoute>
              <Checkout />
            </UserOnlyRoute>
          }
        />
        <Route
          path="/search"
          element={
            <UserOnlyRoute>
              <ProductListingPage />
            </UserOnlyRoute>
          }
        />
        <Route
          path="/cancel/:productID"
          element={
            <UserRoute>
              <CancelOrder />
            </UserRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route
        path='/about'
        element={
          <AboutUs/>
        }
        />
      </Routes>

      {!isAdminPath && <Footer />}
      <ToastContainer />
    </>
  );
}

export default App;
