import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import Welcome from './components/Welcome';
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import Signout from './components/auth/Signout';
import Feature from './components/Feature';

import reducers from './reducers';

const store = createStore(
    reducers,
    {   //initial state
        auth: { authenticated: localStorage.getItem('token')}
    },  
    applyMiddleware(reduxThunk)
);
// App/Route note:  Route will be passed to the App component as prop children
ReactDOM.render(
    <Provider store={store} >
        <BrowserRouter>
            <App>
                <Route path="/" exact component={Welcome} />            
                <Route path="/signup" component={Signup} />
                <Route path="/signin" component={Signin} />                
                <Route path="/feature" component={Feature} />
                <Route path="/signout" component={Signout} />
            </App>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root')
);
