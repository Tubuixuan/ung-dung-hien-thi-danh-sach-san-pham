// src/ProductItem.js
import React from "react";

const ProductItem = ({ product, addToCart }) => {
  // THÊM MỚI
  return (
    <div className="product-item">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>{" "}
      {/* THÊM MỚI */}
    </div>
  );
};

export default ProductItem;
