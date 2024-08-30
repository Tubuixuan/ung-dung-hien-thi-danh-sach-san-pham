/*Sử dụng ProductList component trong App.js để hiển thị danh sách sản phẩm.*/
// src/App.js
import React from "react";
import ProductList from "./ProductList";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <h1>DANH SÁCH SẢN PHẨM</h1>
      <ProductList />
    </div>
  );
};

export default App;
