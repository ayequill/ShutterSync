import {
  BrowserRouter,
  Route,
  // createBrowserRouter,
  // RouteObject,
  // RouterProvider,
  Routes,
} from 'react-router-dom';

import Album from './components/albums/Album';
import Upload from './components/albums/Upload';
import EmailConfirm from './components/auth/EmailConfirm';
import Login from './components/auth/Login';
import PrivateRoute from './components/auth/PrivateRoute';
import Reset from './components/auth/Reset';
import SignUp from './components/auth/SignUp';
import {
  AlbumProvider,
  AlbumsProvider,
} from './components/contexts/albumContext';
import Home from './components/core/Home';
import MainLayout from './components/core/LayOut';
import Dashboard from './components/user/Dashboard';

function MainRouter() {
  return (
    <BrowserRouter>
      <AlbumsProvider>
        <AlbumProvider>
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
                  <PrivateRoute />
                </MainLayout>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="upload" element={<Upload />} />
              <Route path="album/:albumId" element={<Album />} />
            </Route>
            <Route
              path="reset"
              element={
                <MainLayout>
                  <Reset />
                </MainLayout>
              }
            />
            <Route
              path="/verify/:token"
              element={
                <MainLayout>
                  <EmailConfirm />
                </MainLayout>
              }
            />
          </Routes>
        </AlbumProvider>
      </AlbumsProvider>
    </BrowserRouter>
  );
}

export default MainRouter;
