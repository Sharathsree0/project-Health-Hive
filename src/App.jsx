import Home from "./pages/Home/home";
import Navbar from "./components/Navbar/navbar";
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import Products from "./pages/Products/product";
import { useLocation ,Routes, Route, useParams} from 'react-router-dom'
import Cart from "./pages/Cart/cart";
import { ToastContainer } from "react-toastify";
import Productlist from "./pages/Products/productlist";
import Order from "./pages/Order page/order";

export default function App() {
   
    const location = useLocation()
    const ConditonNavbar = () => {
        
        if (location.pathname === '/login' || location.pathname === '/register' ){
            return null
        } else {
            return <Navbar />
        }
    }
    return (
        <>
           <ConditonNavbar />
          
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<search/>} />
                <Route path="/products" element={<Products/>} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order" element={<Order />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/products/:id" element={<Productlist/>} />

            </Routes>
        </>
    )
}
