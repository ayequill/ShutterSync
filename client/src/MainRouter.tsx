import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Album from './components/albums/Album';
import Upload from './components/albums/Upload';
import EmailConfirm from './components/auth/EmailConfirm';
import Login from './components/auth/Login';
import PrivateRoute from './components/auth/PrivateRoute';
import ResetPassword from './components/auth/ResetPassword';
import ResetPasswordRequest from './components/auth/ResetPasswordRequest';
import SignUp from './components/auth/SignUp';
import {
  AlbumProvider,
  AlbumsProvider,
} from './components/contexts/albumContext';
import { UserProvider } from './components/contexts/userContext';
import ErrorPage from './components/core/ErrorPage';
import Home from './components/core/Home';
import MainLayout from './components/core/LayOut';
import Dashboard from './components/user/Dashboard';
import Profile from './components/user/Profile';

function MainRouter() {
  return (
    <BrowserRouter>
      <UserProvider>
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
                <Route path="profile" element={<Profile />} />
              </Route>
              <Route
                path="forgot-password"
                element={
                  <MainLayout>
                    <ResetPasswordRequest />
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
              <Route
                path="/forgot-password/:token"
                element={
                  <MainLayout>
                    <ResetPassword />
                  </MainLayout>
                }
              />
              <Route
                path="*"
                element={
                  <MainLayout>
                    <ErrorPage />
                  </MainLayout>
                }
              />
            </Routes>
          </AlbumProvider>
        </AlbumsProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default MainRouter;
