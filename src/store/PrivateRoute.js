import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props => auth ? (<Component {...props} />) : (<Redirect to="/" />)}
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.string.isRequired
};

const mapStateToProps = ({ Auth }) => ({
  auth: Auth.auth
});

export default connect(mapStateToProps)(PrivateRoute);
