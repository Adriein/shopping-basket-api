import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { GeneralProvider } from '../context/GeneralContext';
import { ProtectedRoute } from './ProtectedRoute';

import Login from './Login';
import Baskets from './Baskets';
import Basket from './Basket';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Route path="/" exact component={Login} />
        <GeneralProvider>
          <ProtectedRoute path="/basketlist" exact component={Baskets} />
          <ProtectedRoute path="/basketid" exact component={Basket} />
        </GeneralProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
