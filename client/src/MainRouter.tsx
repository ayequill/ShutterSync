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
import SignUp from './components/auth/SignUp';
import Home from './components/core/Home';
import Dashboard from './components/user/Dashboard';

// interface Router {
//   routes: RouteObject[];
// }
//
// const router: Router = createBrowserRouter([
//   {
//     path: '/',
//     Component: Home,
//   },
//   { path: '/signin', Component: Login },
//   { path: '/signup', Component: SignUp },
// ]);
//
// function MainRouter() {
//   return (
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-ignore
//     <RouterProvider router={router} />
//   );
// }

function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signin" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRouter;
