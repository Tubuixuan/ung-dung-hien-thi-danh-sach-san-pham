/*Tạo một component ProductItem để hiển thị thông tin của từng sản phẩm. 
Component này sẽ nhận props từ ProductList để hiển thị tên sản phẩm và mô tả.
 */
// src/ProductItem.js
import React from "react";

const ProductItem = ({ product }) => {
  return (
    <div className="product-item">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
};

export default ProductItem;
