import {createContext, useContext, useEffect, useState} from "react";


const INITIAL_STATE = JSON.parse(localStorage.getItem('user')) || false

export const Context = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(INITIAL_STATE);

  const data = {
    user,
    setUser
  }

  useEffect(()=>{
    localStorage.setItem('user',JSON.stringify(user))
  },[user])

  return (
    <Context.Provider value={data}>
      {children}
    </Context.Provider>
  );
};

export const useAuth = () => useContext(Context)
