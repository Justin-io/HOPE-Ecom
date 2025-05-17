import { useState } from "react";

export default function App() {
  const [products] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 89.99,
      category: "Electronics",
      image: "https://placehold.co/400x300/3498db/ffffff?text=Headphones ",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 129.99,
      category: "Electronics",
      image: "https://placehold.co/400x300/e74c3c/ffffff?text=Watch ",
    },
    {
      id: 3,
      name: "Running Shoes",
      price: 59.99,
      category: "Fashion",
      image: "https://placehold.co/400x300/2ecc71/ffffff?text=Shoes ",
    },
    {
      id: 4,
      name: "Leather Jacket",
      price: 199.99,
      category: "Fashion",
      image: "https://placehold.co/400x300/9b59b6/ffffff?text=Jacket ",
    },
    {
      id: 5,
      name: "Coffee Maker",
      price: 49.99,
      category: "Home",
      image: "https://placehold.co/400x300/f1c40f/ffffff?text=Coffee+Maker ",
    },
    {
      id: 6,
      name: "Blender",
      price: 39.99,
      category: "Home",
      image: "https://placehold.co/400x300/1abc9c/ffffff?text=Blender ",
    },
  ]);

  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState(null);

  // Filtered products
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "All" || product.category === selectedCategory)
  );

  // Get unique categories
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Add to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setLastAddedItem(product);
    setTimeout(() => setLastAddedItem(null), 1000);
    setIsCartOpen(true);
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Quantity control
  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Total price
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Shoproyince
          </h1>
          <div className="flex items-center space-x-4">
            <div className="relative max-w-xs w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white/70"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute left-3 top-2.5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full bg-white/50 hover:bg-white transition-all duration-200"
              aria-label="View Cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5L7 13zm2 2h6m-6 4h6"
                />
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Category Filters */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex space-x-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                    : "bg-white/70 text-gray-700 hover:bg-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white/60 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transform transition-transform hover:-translate-y-1 hover:shadow-xl"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <p className="text-gray-600 mb-2">{product.category}</p>
                  <p className="text-indigo-600 font-bold">${product.price.toFixed(2)}</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-3 w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 rounded hover:opacity-90 transition-opacity"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-xl">No products found.</p>
            </div>
          )}
        </div>
      </main>

      {/* Cart Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-md bg-white/95 backdrop-blur-lg shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold text-indigo-700">Shopping Cart</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close Cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-grow overflow-y-auto p-4">
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center mt-8">Your cart is empty</p>
            ) : (
              <ul className="space-y-4">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="border rounded-lg p-3 flex items-start bg-gray-50 shadow-sm"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded mr-4"
                    />
                    <div className="flex-grow">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-indigo-600">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center ml-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        aria-label="Decrease Quantity"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        aria-label="Increase Quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-2 text-red-500 hover:text-red-700"
                      aria-label="Remove Item"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {cart.length > 0 && (
            <div className="p-4 border-t">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Total:</span>
                <span className="font-bold text-lg text-indigo-600">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors">
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay when cart is open */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={() => setIsCartOpen(false)}
        ></div>
      )}

      {/* Footer */}
      <footer className="bg-white/70 backdrop-blur-sm border-t mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-600">
            &copy; {new Date().getFullYear()} Happy Shoping with HOPE. All Rights Reserved To HOPE-Ecom
          </p>
        </div>
      </footer>
    </div>
  );
}