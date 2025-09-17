import { useCart } from "../Cartcontext/cartcontext";
import "./cart.css";

export default function Cart() {
    const { cartItems, removeFromCart, addToCart, decreaseQuantity, handleCheckout } = useCart();

    const totalPrice = cartItems.reduce((total, item) => {
        return total + (Number(item.price || 0) * item.quantity);
    }, 0);

    return (
        <div className="pagecontainer">
            <h1>Your Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <p>Your cart is empty. Start adding some awesome products!</p>
            ) : (
                <div className="items-list">
                    {cartItems.map((item) => (
                        <div key={item.id} className="item-card">
                            <img src={item.image} alt={item.name} className="item-image" />
                            <div className="item-details">
                                <h3>{item.name}</h3>
                                <p>Category: {item.category}</p>
                                <p>Price: ₹{item.price}</p>
                                <div className="quantity-controls">
                                    <button onClick={() => decreaseQuantity(item.id)} className="quantity-btn">-</button>
                                    <span className="quantity-display">{item.quantity}</span>
                                    <button onClick={() => addToCart(item)} className="quantity-btn">+</button>
                                </div>
                                <button onClick={() => removeFromCart(item.id)} className="remove-from-cart">Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {cartItems.length > 0 && (
                <div className="summary">
                    <h3>Order Summary</h3>
                    <p>Total Items: {cartItems.length}</p>
                    <p>Total Price: ₹{totalPrice}</p>
                    
                    <button className="checkout" onClick={handleCheckout}>
                        Proceed to Checkout
                    </button>
                </div>
            )}
        </div>
    );
}