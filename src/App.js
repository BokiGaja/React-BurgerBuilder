import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from "react-redux";
import * as actions from './store/actions/index'

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }
    
    isAuth() {
        let routes = (
            <Switch>
                <Route path="/" exact component={BurgerBuilder} />
                <Route path="/auth" component={Auth} />
                <Redirect to="/"/>
            </Switch>


        );
        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/orders" component={Orders} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/" exact component={BurgerBuilder} />
                    <Redirect to="/"/>
                </Switch>
            )
        }
        return routes;
    }

    render() {
    return (
      <div>
        <Layout>
            { this.isAuth() }
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null    
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
