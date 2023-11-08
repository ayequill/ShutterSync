import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';

import Login from './components/auth/Login';
import Home from './components/core/Home';

interface Router {
  routes: RouteObject[];
}

const router: Router = createBrowserRouter([
  { path: '/signin', Component: Login },
  { path: '/', Component: Home },
]);

function MainRouter() {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <RouterProvider router={router} />
  );
}

export default MainRouter;
