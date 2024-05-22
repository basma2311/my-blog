import React from 'react'
import "../src/Pages/App.css"
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Footer from './conponents/FOOTER/Footer.jsx'
import { BrowserRouter,  } from 'react-router-dom'
import Nav from './conponents/navbar/Nav.jsx'
import AuthProvider from './context/AuthContext.jsx'
import { SearchProvider } from './context/SearchContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <SearchProvider>
    <Nav/>
    <App />
    <Footer />
    </SearchProvider >
    </AuthProvider>
  </BrowserRouter>
  </React.StrictMode>,
)

  


