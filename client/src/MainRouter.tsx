import {
  BrowserRouter,
  Route,
  // createBrowserRouter,
  // RouteObject,
  // RouterProvider,
  Routes,
} from 'react-router-dom';

import Login from './components/auth/Login';
import PrivateRoute from './components/auth/PrivateRoute';
import Reset from './components/auth/Reset';
import SignUp from './components/auth/SignUp';
import Home from './components/core/Home';
import MainLayout from './components/core/LayOut';
import Dashboard from './components/user/Dashboard';

function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="signin"
          element={
            <MainLayout>
              <Login />
            </MainLayout>
          }
        />
        <Route
          path="signup"
          element={
            <MainLayout>
              <SignUp />
            </MainLayout>
          }
        />
        <Route
          path="dashboard"
          element={
            <MainLayout>
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            </MainLayout>
          }
        />
        <Route
          path="reset"
          element={
            <MainLayout>
              <Reset />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRouter;
