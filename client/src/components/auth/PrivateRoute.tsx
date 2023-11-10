import { Navigate, Route } from 'react-router-dom';

import { isAuthenticated } from './auth-helper';

// eslint-disable-next-line react/prop-types,@typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line react/prop-types
function PrivateRoute({ element: Element, ...rest }) {
  return (
    <Route
      {...rest}
      element={
        isAuthenticated() ? (
          <Element />
        ) : (
          <Navigate to="/signin" state={{ from: rest.location }} replace />
        )
      }
    />
  );
}

export default PrivateRoute;
