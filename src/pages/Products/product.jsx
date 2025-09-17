import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../Cartcontext/cartcontext';
import { FaBorderNone, FaShoppingCart } from 'react-icons/fa';
import { useSearchParams, Link } from 'react-router-dom';
import './product.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('default');
  const [searchParams, setSearchParams] = useSearchParams();

  const { addToCart } = useCart();
  const categoryFilter = searchParams.get('category');

  useEffect(() => {
    axios.get("http://localhost:5001/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Failed to fetch products:", err));
  }, []);

  const allCategories = [...new Set(products.map(p => p.category))];

  let displayedProducts = [...products];

  if (categoryFilter) {
    displayedProducts = displayedProducts.filter(p => p.category === categoryFilter);
  }

  if (searchTerm) {
    displayedProducts = displayedProducts.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (sortOrder === 'low-to-high') {
    displayedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'high-to-low') {
    displayedProducts.sort((a, b) => b.price - a.price);
  }

  const handleCategoryClick = (category) => setSearchParams({ category });
  const clearFilters = () => {
    setSearchParams({});
    setSearchTerm('');
    setSortOrder('default');
  };

  return (
    <div className="container">
      <h2 className="heading">Our Products</h2>

      <div className="filter-controls">
        <input
          type="text"
          placeholder="Search for products..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="sort-dropdown"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="default">Sort by</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>

      <div className="category-filter-bar">
        <ul className="category-list">
          <li><button onClick={clearFilters}>All Products</button></li>
          {allCategories.map(category => (
            <li key={category}>
              <button onClick={() => handleCategoryClick(category)}>{category}</button>
            </li>
          ))}
        </ul>
      </div>

      {categoryFilter && (
        <div className="filter-header">
          Showing: <strong>{categoryFilter}</strong>
        </div>
      )}

      <ul className="list">
        {displayedProducts.map(product => (
          <li key={product.id} className="card" >
            <img src={product.image} alt={product.name} className="image" />
            <h3 className="title">{product.name}</h3>
            <p className="category">{product.category}</p>
            <p className="price">₹{product.price}</p>
            <button style={{textDecoration:null}} > <Link to={`/products/${product.id}`}>view</Link>  </button>
            <button className="add-to-cart" onClick={() => addToCart(product)}>
              <FaShoppingCart /> Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
