import React, { useContext, useReducer, useEffect } from 'react';
import { reducer } from './reducer';

const AppContext = React.createContext();

const initialState = {
  loading: false,
  page: 0,
  users: []
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async () => {
    dispatch({ type: 'LOADING' });
    const response = await fetch(`https://api.github.com/users?since=${state.page}&per_page=4`);
    const users = await response.json();
    dispatch({ type: 'DISPLAY_USERS', payload: users });
  };

  const nextPage = () => {
    dispatch({ type: 'NEXT_PAGE' });
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'LOADING' });
      const response = await fetch(`https://api.github.com/users?since=${state.page}&per_page=4`);
      const users = await response.json();
      dispatch({ type: 'DISPLAY_USERS', payload: users });
    };
    fetchData();
  }, [state.page]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        nextPage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };