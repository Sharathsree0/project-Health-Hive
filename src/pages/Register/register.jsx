import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate, } from "react-router-dom";
import { toast } from 'react-toastify';

export default function Register() {
    let initialize = { name: "", email: "", password: "" ,fav:[],cart:[]}; 
    const navigate = useNavigate();
    const [value, setvalue] = useState(initialize);
    const [error, seterror] = useState({});

    const handleChange = (e) => {
        setvalue({ ...value, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = {};
        if (!value.name.trim()) { err.name = "Name required" }
        if (!value.email.trim()) { err.email = "Email required" } else if (!value.email.includes("@")) { err.email = "Incorrect Format" }
        if (!value.password.trim()) { err.password = "password required" } else if (value.password.length < 8) { err.password = "Must atleast 8 characters" }
        seterror(err);

        if (Object.keys(err).length === 0) {
            try {
                const existingUserResponse = await axios.get(`http://localhost:5001/users?email=${value.email}`);
                
                if (existingUserResponse.data.length === 0) {
                    const newUserResponse = await axios.post(`http://localhost:5001/users`, {
                        name: value.name,
                        email: value.email,
                        password: value.password,
                        cart:[],
                        wishlist:[]
                    });

                    const newUser = newUserResponse.data;
                    console.log("Registration Successful, User Created:", newUser);

                    toast.success("Registration Successful");
                    navigate("/login");

                } else {
                    console.log("Email already registered");
                    toast.error("Email already registered");
                }
            } catch (error) {
                console.error("Registration failed:", error);
            }
        }
    };

    return (
        <>
            <div className='login-container ' style={{ textAlign: "center" }}>
                <form onSubmit={handleSubmit}>
                    <h1>Registration Page</h1>
                    <input type="text" placeholder="Enter name" name='name' value={value.name} onChange={handleChange} />{error.name && <p style={{ color: "red" }}>{error.name}</p>}<br /><br />
                    <input type="email" placeholder="Enter email" name='email' value={value.email} onChange={handleChange} />{error.email && <p style={{ color: "red" }}>{error.email}</p>}<br /><br />
                    <input type="password" placeholder="Enter password" name='password' value={value.password} onChange={handleChange} />{error.password && <p style={{ color: "red" }}>{error.password}</p>}<br /><br />
                    <button type="submit">Register</button>
                    <Link to="/login" style={{ color: "#00a86b", fontWeight: "bold" }}>Back to login</Link>

                </form>
            </div>
        </>
    );
}