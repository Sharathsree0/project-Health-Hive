import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../../pages/authcontext/authcontext';

export default function Navbar() {
  const { isLogged, user, logout } = useAuth();
console.log("isLogged:", isLogged);
console.log("user:", user);


  return (
    <>
  <nav>
        <Link to="/">
          <img
            src={"/Images/Health Hive.png"}
            style={{ width: "140px", height: "70px", borderRadius: "50%" }}
            alt="Health Hive Logo"
          />
        </Link>
      
        <div className="nav-links">
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>

        </div>


        <div className='nav-auth'>
          {isLogged ? (
            <>
              <NavLink to="/order">My Orders</NavLink>
              <span className='welcome-message'>Welcome, {user?.name}</span>
              <button onClick={logout} className='logout-button'>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </div>
      </nav>
      
    </>
  );
}
