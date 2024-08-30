// src/ProductList.js
import React, { useState } from "react"; // THÊM MỚI
import ProductItem from "./ProductItem";

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState(""); // THÊM MỚI

  const products = [
    {
      id: 1,
      name: "Product 1",
      description: "This is the description for product 1",
    },
    {
      id: 2,
      name: "Product 2",
      description: "This is the description for product 2",
    },
    {
      id: 3,
      name: "Product 3",
      description: "This is the description for product 3",
    },
  ];

  const filteredProducts = products.filter(
    (
      product // THÊM MỚI
    ) => product.name.toLowerCase().includes(searchTerm.toLowerCase()) // THÊM MỚI
  ); // THÊM MỚI

  return (
    <div className="product-list">
      <input // THÊM MỚI
        type="text" // THÊM MỚI
        placeholder="Search products..." // THÊM MỚI
        value={searchTerm} // THÊM MỚI
        onChange={(e) => setSearchTerm(e.target.value)} // THÊM MỚI
        className="search-input" // THÊM MỚI
      />{" "}
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
