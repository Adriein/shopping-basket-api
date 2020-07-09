import React, { createContext, useReducer } from 'react';
import authReducer from '../reducers/authReducer.js';

export const AuthContext = createContext();
export const DispatchContext = createContext();

const defaultAuth = {
  username: '',
  token: undefined,
  errormsg: undefined,
  remember: false,
};
export function AuthProvider(props) {
  const [auth, dispatch] = useReducer(authReducer, defaultAuth);
  const getToken = () => {
    const cookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('express'));
    if (cookie) return cookie.split('=')[1];

    return undefined;
  };
  return (
    <AuthContext.Provider value={{auth, getToken}}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </AuthContext.Provider>
  );
}
