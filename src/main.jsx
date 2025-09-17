import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './pages/Cartcontext/cartcontext.jsx'
import Authprovider from './pages/authcontext/authcontext.jsx'
// import { ToastContainer } from 'react-toastify'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Authprovider>
    <CartProvider>
        <App />  
    </CartProvider>
    </Authprovider>  
    </BrowserRouter>
  </StrictMode>,
)
