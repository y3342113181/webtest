import React, { lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import './App.css'
import { Provider } from 'react-redux'
import { store } from './store'

function App() {
  const Login = lazy(() => import('./pages/Login/Login'));
  const Register = lazy(() => import('./pages/Register/Register'));
  const ForgetPassword = lazy(() => import('./pages/ForgetPassword/ForgetPassword'));
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1890ff',
          },
        }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
          </Routes>
        </Router>
      </ConfigProvider>
    </Provider>
  )
}

export default App
