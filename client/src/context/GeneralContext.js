import React, { createContext, useReducer } from 'react';
import generalReducer from '../reducers/generalReducer.js';

export const GeneralContext = createContext();
export const DispatchContext = createContext();

const defaultState = {
  groups: [],
  basket: [],
  error: undefined,
};
export function GeneralProvider(props) {
  const [state, dispatch] = useReducer(generalReducer, defaultState);

  return (
    <GeneralContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </GeneralContext.Provider>
  );
}
