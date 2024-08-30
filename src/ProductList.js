// src/ProductList.js
import React, { useState } from "react";
import ProductItem from "./ProductItem";

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [nameSortOrder, setNameSortOrder] = useState(""); // THÊM MỚI

  const products = [
    {
      id: 1,
      name: "Product 1",
      description: "This is the description for product 1",
      price: 50,
    },
    {
      id: 2,
      name: "Product 2",
      description: "This is the description for product 2",
      price: 30,
    },
    {
      id: 3,
      name: "Product 3",
      description: "This is the description for product 3",
      price: 20,
    },
    {
      id: 4,
      name: "Product 4",
      description: "This is the description for product 4",
      price: 60,
    },
    {
      id: 5,
      name: "Product 5",
      description: "This is the description for product 5",
      price: 40,
    },
    {
      id: 6,
      name: "Product 6",
      description: "This is the description for product 6",
      price: 70,
    },
  ];

  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (priceFilter === "" || product.price <= parseInt(priceFilter))
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    })
    .sort((a, b) => {
      // THÊM MỚI
      if (nameSortOrder === "asc") return a.name.localeCompare(b.name); // THÊM MỚI
      if (nameSortOrder === "desc") return b.name.localeCompare(a.name); // THÊM MỚI
      return 0; // THÊM MỚI
    }); // THÊM MỚI

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
      <select // THÊM MỚI
        value={nameSortOrder} // THÊM MỚI
        onChange={(e) => setNameSortOrder(e.target.value)} // THÊM MỚI
        className="name-sort-order" // THÊM MỚI
      >
        {" "}
        {/* THÊM MỚI */}
        <option value="">Sort by Name</option> {/* THÊM MỚI */}
        <option value="asc">Name: A to Z</option> {/* THÊM MỚI */}
        <option value="desc">Name: Z to A</option> {/* THÊM MỚI */}
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
