import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

let logoutTimer;

const AuthContext = React.createContext({
  token: '',
  roleId:'',
  userId:'',
  isLoggedIn: false,
  login: (token,expirationTime,roleId,userId) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  console.log(new Date().getTime())
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return expirationTime;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationDate = localStorage.getItem('expirationTime');
  const roleId = localStorage.getItem('roleId');
  const userId = localStorage.getItem('userId');
  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 7500) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
    roleId:roleId,
    userId : userId
  };
};

export const AuthContextProvider = (props) => {
  const history = useHistory();
  
  const tokenData = retrieveStoredToken();
  
  let initialToken;
  let role;
  let user;
  if (tokenData) {
    initialToken = tokenData.token;
    role = tokenData.roleId
    user = tokenData.userId
  }

  const [token, setToken] = useState(initialToken);
  const [roleId,setRoleId] = useState(role);
  const [userId,setUserId] = useState(user);
  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    history.push('/')
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime,roleId,userId) => {
    setToken(token);
    setRoleId(roleId);
    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', expirationTime);
    localStorage.setItem('roleId', roleId);
    localStorage.setItem('userId',userId)
    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    roleId:roleId,
    userId:userId,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;