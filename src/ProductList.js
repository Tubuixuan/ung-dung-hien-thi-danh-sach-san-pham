// src/ProductList.js
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      toast.error(`Failed to save cart to local storage: ${error.message}`);
    }
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

  const retryAction = (action, args, retries = 3) => {
    let attempt = 0;
    const execute = () => {
      try {
        action(...args);
      } catch (error) {
        if (attempt < retries) {
          attempt++;
          toast.warn(`Retrying... (${attempt}/${retries})`);
          execute();
        } else {
          toast.error(
            `Action failed after ${retries} attempts: ${error.message}`
          );
        }
      }
    };
    execute();
  };

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    ); // THÊM MỚI
    if (existingProductIndex !== -1) {
      // THÊM MỚI
      const newCart = [...cart]; // THÊM MỚI
      newCart[existingProductIndex].quantity += 1; // THÊM MỚI
      retryAction(setCart, [newCart]); // THÊM MỚI
    } else {
      // THÊM MỚI
      retryAction(setCart, [[...cart, { ...product, quantity: 1 }]]); // THÊM MỚI
    } // THÊM MỚI
    toast.success(`${product.name} added to cart!`);
  };

  const removeFromCart = (index) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this item from your cart?"
    );
    if (confirmed) {
      try {
        const product = cart[index];
        const newCart = cart.filter((_, i) => i !== index);
        retryAction(setCart, [newCart]);
        toast.info(`${product.name} removed from cart!`);
      } catch (error) {
        toast.error(`Failed to remove product from cart: ${error.message}`);
      }
    }
  };

  const toggleSelectItem = (index) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((i) => i !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  const removeSelectedItems = () => {
    const confirmed = window.confirm(
      "Are you sure you want to remove selected items from your cart?"
    );
    if (confirmed) {
      try {
        const newCart = cart.filter((_, i) => !selectedItems.includes(i));
        retryAction(setCart, [newCart]);
        setSelectedItems([]);
        toast.info(`Selected items removed from cart!`);
      } catch (error) {
        toast.error(
          `Failed to remove selected items from cart: ${error.message}`
        );
      }
    }
  };

  const increaseQuantity = (index) => {
    // THÊM MỚI
    const newCart = [...cart]; // THÊM MỚI
    newCart[index].quantity += 1; // THÊM MỚI
    retryAction(setCart, [newCart]); // THÊM MỚI
  }; // THÊM MỚI

  const decreaseQuantity = (index) => {
    // THÊM MỚI
    const newCart = [...cart]; // THÊM MỚI
    if (newCart[index].quantity > 1) {
      // THÊM MỚI
      newCart[index].quantity -= 1; // THÊM MỚI
      retryAction(setCart, [newCart]); // THÊM MỚI
    } else {
      // THÊM MỚI
      removeFromCart(index); // THÊM MỚI
    } // THÊM MỚI
  }; // THÊM MỚI

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
          <>
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(index)}
                  onChange={() => toggleSelectItem(index)}
                />
                <p>
                  {item.name} - ${item.price} - Quantity: {item.quantity}{" "}
                  {/* THÊM MỚI */}
                </p>
                <button onClick={() => increaseQuantity(index)}>+</button>{" "}
                {/* THÊM MỚI */}
                <button onClick={() => decreaseQuantity(index)}>-</button>{" "}
                {/* THÊM MỚI */}
                <button onClick={() => removeFromCart(index)}>Remove</button>
              </div>
            ))}
            <button onClick={removeSelectedItems}>Remove Selected Items</button>
          </>
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default ProductList;
