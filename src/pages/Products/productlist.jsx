import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../Cartcontext/cartcontext';
import  "./product.css"
export default function ProductDetail() {
    const [product, setProduct] = useState(null);
    const { id: productId } = useParams(); 
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProductData = async () => {
            if (productId) {
                try {
                    const res = await axios.get(`http://localhost:5001/products/${productId}`);
                    setProduct(res.data);
                } catch (err) {
                    console.log("Error fetching product:", err);
                }
            }
        };
        fetchProductData();
    }, [productId]); 

    
    if (!product) {
        return <div className="loading-message">Loading product details...</div>;
    }

    return (
        <div className="product-detail-container">
            <div className="product-detail-image-container">

                <img src={product.image} alt={product.name} className="product-detail-image" />
            </div>
            <div className="product-detail-info">
                <p className="product-detail-category">{product.category}</p>
                <h1 className="product-detail-name">{product.name}</h1>
                <p className="product-detail-description">{product.description}</p>
                
                {product.nutritionFacts && (
                    <div className="product-nutrition">
                        <h3>Nutrition Facts</h3>
                        <p>Serving Size: {product.nutritionFacts.servingSize}</p>
                    </div>
                )}

                <p className="product-detail-price">₹{product.price}</p>
                <button className="add-to-cart-btn-detail" onClick={() => addToCart(product)}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
}