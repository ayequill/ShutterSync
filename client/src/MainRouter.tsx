import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';

import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Home from './components/core/Home';

interface Router {
  routes: RouteObject[];
}

const router: Router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  { path: '/signin', Component: Login },
  { path: '/signup', Component: SignUp },
]);

function MainRouter() {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <RouterProvider router={router} />
  );
}

export default MainRouter;
