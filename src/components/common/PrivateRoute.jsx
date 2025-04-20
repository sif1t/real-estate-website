import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Loading from './Loading';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, loading } = useAuth();
  
  return (
    <Route
      {...rest}
      render={(props) => {
        if (loading) {
          return <Loading message="Checking authentication..." />;
        }
        
        return user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;