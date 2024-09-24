import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from "./pages/auth/index.jsx";
import Chat from "./pages/chat/index.jsx";
import Profile from "./pages/profile/index.jsx";
import { useAppStore } from './store/index.js';
import { apiClient } from './lib/api-client.js';
import { GET_USER_INFO } from './utils/constants.js';
import Loader from './components/Loader.jsx';


const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/auth" />;
}

const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/chat" /> : children;
}

export default function App() {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () =>  {
      try {
        const response = await apiClient.get(GET_USER_INFO,{
          withCredentials: true,
        });
        // console.log(response);
        
        if(response.status === 200 && response.data.id){
          setUserInfo(response.data);
        }else{
          setUserInfo(undefined);
        }
        // console.log(response);
      } catch(error){
        setUserInfo(undefined);
      }finally{
        setLoading(false);
      }
    };
    if(!userInfo){
      getUserData();
    }else{
      setLoading(false);
    }
  },[userInfo,setUserInfo]);

  if (loading) {
    return <Loader/>; 
  }
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          }
          />
          <Route path="/chat" element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
          />
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } 
          />
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
