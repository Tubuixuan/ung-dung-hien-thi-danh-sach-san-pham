// src/ProductList.js
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify"; // THÊM MỚI
import "react-toastify/dist/ReactToastify.css"; // THÊM MỚI
import ProductItem from "./ProductItem";

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [nameSortOrder, setNameSortOrder] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [colorFilter, setColorFilter] = useState("");
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const products = [
    {
      id: 1,
      name: "Product 1",
      description: "This is the description for product 1",
      price: 50,
      category: "Electronics",
      color: "Red",
    },
    {
      id: 2,
      name: "Product 2",
      description: "This is the description for product 2",
      price: 30,
      category: "Books",
      color: "Blue",
    },
    {
      id: 3,
      name: "Product 3",
      description: "This is the description for product 3",
      price: 20,
      category: "Clothing",
      color: "Green",
    },
    {
      id: 4,
      name: "Product 4",
      description: "This is the description for product 4",
      price: 60,
      category: "Electronics",
      color: "Red",
    },
    {
      id: 5,
      name: "Product 5",
      description: "This is the description for product 5",
      price: 40,
      category: "Books",
      color: "Blue",
    },
    {
      id: 6,
      name: "Product 6",
      description: "This is the description for product 6",
      price: 70,
      category: "Clothing",
      color: "Green",
    },
  ];

  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (priceFilter === "" || product.price <= parseInt(priceFilter)) &&
        (categoryFilter === "" || product.category === categoryFilter) &&
        (colorFilter === "" || product.color === colorFilter)
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    })
    .sort((a, b) => {
      if (nameSortOrder === "asc") return a.name.localeCompare(b.name);
      if (nameSortOrder === "desc") return b.name.localeCompare(a.name);
      return 0;
    });

  const addToCart = (product) => {
    setCart([...cart, product]);
    toast.success(`${product.name} added to cart!`); // THÊM MỚI
  };

  const removeFromCart = (index) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this item from your cart?"
    );
    if (confirmed) {
      const product = cart[index]; // THÊM MỚI
      const newCart = cart.filter((_, i) => i !== index);
      setCart(newCart);
      toast.info(`${product.name} removed from cart!`); // THÊM MỚI
    }
  };

  return (
    <div className="product-list">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <select
        value={priceFilter}
        onChange={(e) => setPriceFilter(e.target.value)}
        className="price-filter"
      >
        <option value="">All Prices</option>
        <option value="20">Under $20</option>
        <option value="50">Under $50</option>
        <option value="70">Under $70</option>
      </select>
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="sort-order"
      >
        <option value="">Sort by Price</option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
      <select
        value={nameSortOrder}
        onChange={(e) => setNameSortOrder(e.target.value)}
        className="name-sort-order"
      >
        <option value="">Sort by Name</option>
        <option value="asc">Name: A to Z</option>
        <option value="desc">Name: Z to A</option>
      </select>
      <select
        value={colorFilter}
        onChange={(e) => setColorFilter(e.target.value)}
        className="color-filter"
      >
        <option value="">All Colors</option>
        <option value="Red">Red</option>
        <option value="Blue">Blue</option>
        <option value="Green">Green</option>
      </select>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))
      ) : (
        <p>No products found</p>
      )}
      <div className="cart">
        <h2>Shopping Cart</h2>
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <div key={index} className="cart-item">
              <p>
                {item.name} - ${item.price}
              </p>
              <button onClick={() => removeFromCart(index)}>Remove</button>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
      <ToastContainer /> {/* THÊM MỚI */}
    </div>
  );
};

export default ProductList;
