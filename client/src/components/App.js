import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { GeneralProvider } from '../context/GeneralContext';
import { ProtectedRoute } from './ProtectedRoute';

import Login from './Login';
import FamilyUnit from './FamilyUnit';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Route path="/" exact component={Login} />
        <GeneralProvider>
          <ProtectedRoute path="/groups" exact component={FamilyUnit} />
        </GeneralProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
