// src/ProductList.js
import React, { useState } from "react";
import ProductItem from "./ProductItem";

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [nameSortOrder, setNameSortOrder] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [colorFilter, setColorFilter] = useState(""); // THÊM MỚI

  const products = [
    {
      id: 1,
      name: "Product 1",
      description: "This is the description for product 1",
      price: 50,
      category: "Electronics",
      color: "Red",
    }, // THÊM MỚI
    {
      id: 2,
      name: "Product 2",
      description: "This is the description for product 2",
      price: 30,
      category: "Books",
      color: "Blue",
    }, // THÊM MỚI
    {
      id: 3,
      name: "Product 3",
      description: "This is the description for product 3",
      price: 20,
      category: "Clothing",
      color: "Green",
    }, // THÊM MỚI
    {
      id: 4,
      name: "Product 4",
      description: "This is the description for product 4",
      price: 60,
      category: "Electronics",
      color: "Red",
    }, // THÊM MỚI
    {
      id: 5,
      name: "Product 5",
      description: "This is the description for product 5",
      price: 40,
      category: "Books",
      color: "Blue",
    }, // THÊM MỚI
    {
      id: 6,
      name: "Product 6",
      description: "This is the description for product 6",
      price: 70,
      category: "Clothing",
      color: "Green",
    }, // THÊM MỚI
  ];

  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (priceFilter === "" || product.price <= parseInt(priceFilter)) &&
        (categoryFilter === "" || product.category === categoryFilter) &&
        (colorFilter === "" || product.color === colorFilter) // THÊM MỚI
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
      <select // THÊM MỚI
        value={colorFilter} // THÊM MỚI
        onChange={(e) => setColorFilter(e.target.value)} // THÊM MỚI
        className="color-filter" // THÊM MỚI
      >
        {" "}
        {/* THÊM MỚI */}
        <option value="">All Colors</option> {/* THÊM MỚI */}
        <option value="Red">Red</option> {/* THÊM MỚI */}
        <option value="Blue">Blue</option> {/* THÊM MỚI */}
        <option value="Green">Green</option> {/* THÊM MỚI */}
      </select>{" "}
      {/* THÊM MỚI */}
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default ProductList;
