/*Tạo một component ProductList để quản lý và hiển thị danh sách các sản phẩm. 
Component này sẽ chứa danh sách các sản phẩm và truyền dữ liệu xuống ProductItem thông qua props.
 */
// src/ProductList.js
import React from "react";
import ProductItem from "./ProductItem";

const ProductList = () => {
  const products = [
    {
      id: 1,
      name: "Sản phẩm 1",
      description: "Đây là mô tả sản phẩm 1, sản phẩm quần áo",
    },
    {
      id: 2,
      name: "Sản phẩm 2",
      description: "Đây là mô tả sản phẩm đồ ăn, thức uống",
    },
    {
      id: 3,
      name: "Sản phẩm 3",
      description: "Đây là mô tả sản phẩm 3, sản phẩm điện tử",
    },
  ];

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
