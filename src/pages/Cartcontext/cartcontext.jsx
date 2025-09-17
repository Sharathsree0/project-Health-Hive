import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from '../authcontext/authcontext';
import { toast } from 'react-toastify';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchCart = async () => {
            if (user && user.id) {
                try {
                    const { data: userData } = await axios.get(`http://localhost:5001/users/${user.id}`);
                    setCartItems(userData.cart || []);
                } catch (error) {
                    console.error("Failed to fetch user cart:", error);
                }
            } else {
                setCartItems([]);
            }
        };
        fetchCart();
    }, [user]);

    const saveCartToServer = async (newCartItems) => {
        if (!user || !user.id) return;
        try {
            const updatedUser = { ...user, cart: newCartItems };
            await axios.put(`http://localhost:5001/users/${user.id}`, updatedUser);
        } catch (error) {
            console.error("Error saving cart to server:", error);
            toast.error("Could not sync your cart.");
        }
    };

    const addToCart = (product) => {
        let newCartItems;
        const existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
            newCartItems = cartItems.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            const newCartItem = {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.image,
                category: product.category,
            };
            newCartItems = [...cartItems, newCartItem];
            alert(`${product.name} added to cart!`);
        }
        setCartItems(newCartItems);
        saveCartToServer(newCartItems);
    };

    const decreaseQuantity = (productId) => {
        const existingItem = cartItems.find(item => item.id === productId);
        let newCartItems;
        if (existingItem.quantity === 1) {
            newCartItems = cartItems.filter(item => item.id !== productId);
        } else {
            newCartItems = cartItems.map(item =>
                item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
            );
        }
        setCartItems(newCartItems);
        saveCartToServer(newCartItems);
    };

    const removeFromCart = (productId) => {
        const newCartItems = cartItems.filter(item => item.id !== productId);
        setCartItems(newCartItems);
        saveCartToServer(newCartItems);
    };

    const handleCheckout = async () => {
        if (!user || cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        try {
            await saveCartToServer(cartItems);

            const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
            const orderDetails = {
                userId: user.id,
                userName: user.name,
                items: cartItems,
                totalPrice,
                orderDate: new Date().toISOString()
            };

            await axios.post('http://localhost:5001/orders', orderDetails);

            setCartItems([]);
            await saveCartToServer([]);

            alert('🎉 Order placed successfully!');
        } catch (error) {
            toast.error("There was a problem placing your order.");
        }
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        handleCheckout,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
