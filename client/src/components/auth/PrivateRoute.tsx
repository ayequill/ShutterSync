import { Navigate } from 'react-router-dom';

import { isAuthenticated } from './auth-helper';

// eslint-disable-next-line react/prop-types,@typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line react/prop-types
function PrivateRoute({ children }) {
  if (!isAuthenticated())
    return (
      <Navigate
        to="/signin"
        replace
        state={{ from: window.location.pathname }}
      />
    );
  return children;
}

export default PrivateRoute;
