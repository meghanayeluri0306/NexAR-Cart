import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [arModel, setArModel] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState('home'); 
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [customArUrl, setCustomArUrl] = useState('');

  useEffect(() => {
    fetch('https://nexar-cart-backend.onrender.com/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log("API Error:", err));
  }, []);

  const openAR = (modelUrl) => setArModel(modelUrl);
  const handleAddToCart = () => { setCartCount(cartCount + 1); alert("Product added to your cart!"); };
  const handleCheckout = () => { setCartCount(0); setCurrentPage('success'); };

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://nexar-cart-backend.onrender.com/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, type: isLoginMode ? 'login' : 'register' })
      });
      const data = await response.json();
      
      if (data.success && isLoginMode) {
        setIsLoggedIn(true); 
      } else if (data.success && !isLoginMode) {
        alert(data.message);
        setIsLoginMode(true); 
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Server Error! Please try again.");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className={isDarkMode ? 'dark-theme' : 'light-theme'} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <button className="theme-btn" onClick={() => setIsDarkMode(!isDarkMode)} style={{ position: 'absolute', top: '20px', right: '30px' }}>
          {isDarkMode ? '☀️' : '🌙'}
        </button>
        <div style={{ padding: '40px', background: isDarkMode ? '#1e1e1e' : '#ffffff', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', width: '350px', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '10px', color: '#2a9d8f' }}>NexAR Cart</h2>
          <h3>{isLoginMode ? 'Welcome Back 👋' : 'Create Account 🚀'}</h3>
          <form onSubmit={handleAuth} style={{ marginTop: '20px' }}>
            <input type="email" placeholder="Email Address" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '12px', margin: '10px 0', borderRadius: '8px', border: '1px solid #ccc', outline: 'none', color: '#333' }} />
            <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '12px', margin: '10px 0', borderRadius: '8px', border: '1px solid #ccc', outline: 'none', color: '#333' }} />
            <button type="submit" className="buy-btn" style={{ width: '100%', marginTop: '15px', padding: '12px', fontSize: '16px' }}>{isLoginMode ? 'Login' : 'Register'}</button>
          </form>
          <p style={{ marginTop: '20px', cursor: 'pointer', color: '#666', fontSize: '14px' }} onClick={() => setIsLoginMode(!isLoginMode)}>
            {isLoginMode ? "Don't have an account? Sign up" : "Already have an account? Login"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={isDarkMode ? 'dark-theme' : 'light-theme'}>
      <header className="header">
        <h1>NexAR Cart</h1>
        <nav className="nav-links" style={{ display: 'flex', alignItems: 'center' }}>
          <span className="nav-item" onClick={() => setCurrentPage('home')}>Home</span>
          <span className="nav-item" onClick={() => setCurrentPage('products')}>Products</span>
          
          <span className="nav-item" onClick={() => setCurrentPage('custom-ar')} style={{ color: '#f4a261', borderBottom: currentPage === 'custom-ar' ? '2px solid #f4a261' : 'none' }}>Try AR</span>
          <span className="nav-item" onClick={() => setCurrentPage('about')}>About</span>
          <span className="nav-item" onClick={() => setCurrentPage('cart')}>
            Cart 🛒 <span className="cart-count">{cartCount}</span>
          </span>
          <button className="theme-btn" onClick={() => setIsDarkMode(!isDarkMode)} title="Toggle Dark Mode">{isDarkMode ? '☀️' : '🌙'}</button>
          <button onClick={() => setIsLoggedIn(false)} style={{ background: 'transparent', border: '1px solid #e76f51', color: '#e76f51', padding: '5px 15px', borderRadius: '5px', cursor: 'pointer', marginLeft: '20px', fontWeight: 'bold', transition: '0.3s' }}>Logout</button>
        </nav>
      </header>

      {currentPage === 'home' && (
        <main className="main-content" style={{ textAlign: "center", minHeight: "60vh", paddingTop: "100px" }}>
          <h1 style={{ fontSize: "3rem" }}>Welcome to NexAR</h1>
          <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>Experience the Future of Shopping in Augmented Reality.</p>
          <button className="buy-btn" onClick={() => setCurrentPage('products')}>Explore Products 🚀</button>
        </main>
      )}

      {currentPage === 'products' && (
        <main className="main-content">
          <h2>Our Premium Collection</h2>
          <p style={{marginBottom: "30px"}}>Tip: Use your phone to place products in your room! 📸</p>
          {products.length === 0 ? <p>Loading real-time data from database... ⏳</p> : null}
          <div className="product-grid">
            {products.map((product) => (
              <div className="product-card" key={product.id}>
                <img src={product.image} alt={product.name} className="product-image" />
                <h3>{product.name}</h3>
                <p className="price">{product.price}</p>
                <button className="buy-btn" onClick={handleAddToCart}>Add to Cart</button>
                <button className="ar-btn" onClick={() => openAR(product.arUrl)}>View in AR 👁️</button>
              </div>
            ))}
          </div>
        </main>
      )}

      {currentPage === 'custom-ar' && (
        <main className="main-content" style={{ minHeight: "60vh", textAlign: "center", paddingTop: "40px" }}>
          <h2>Test Your Own 3D Models</h2>
          <p style={{ color: isDarkMode ? '#ccc' : '#666', marginBottom: "20px" }}>
            Paste any .glb link below to view it instantly in your room!
          </p>
          
          <div style={{ background: isDarkMode ? '#1e1e1e' : '#f9f9f9', padding: "30px", borderRadius: "10px", display: "inline-block", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", maxWidth: "600px", width: '100%' }}>
             
             <input 
               type="text" 
               placeholder="Paste .glb link here... (e.g., https://...model.glb)" 
               value={customArUrl}
               onChange={(e) => setCustomArUrl(e.target.value)}
               style={{ width: "90%", padding: "15px", borderRadius: "8px", border: "2px solid #2a9d8f", backgroundColor: isDarkMode ? '#2c3e50' : '#ffffff', color: isDarkMode ? '#ffffff' : '#333', marginBottom: "20px", outline: 'none', fontSize: '16px' }}
             />
             <br/>
             <button className="buy-btn" style={{ padding: '12px 30px', fontSize: '18px' }} onClick={() => {
               if(customArUrl.includes('.glb') || customArUrl.includes('.gltf')) {
                 openAR(customArUrl);
               } else {
                 alert('Please enter a valid .glb or .gltf URL!');
               }
             }}>
               View in AR 👁️
             </button>
             
             <div style={{ marginTop: "40px", textAlign: "left", background: isDarkMode ? '#2c3e50' : '#e0f7fa', padding: "20px", borderRadius: "8px", borderLeft: "5px solid #2a9d8f" }}>
               <h4 style={{ margin: "0 0 10px 0", color: isDarkMode ? '#1abc9c' : '#00796b' }}>📏 How Dimensions Work in NexAR?</h4>
               <p style={{ margin: "0", fontSize: "0.95rem", lineHeight: "1.6", color: isDarkMode ? '#ddd' : '#333' }}>
                 No need to guess the size! Our AR technology automatically scans your floor and places the object in its <strong>True 1:1 Scale</strong>. This means you will see the exact Height, Width, and Depth of the real product right inside your room. Just walk around it to measure!
               </p>
             </div>
          </div>
        </main>
      )}

      {currentPage === 'about' && (
        <main className="main-content" style={{ minHeight: "60vh", textAlign: "center", paddingTop: "50px" }}>
          <h2>About the Project</h2>
          <p style={{ fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
            NexAR Cart is a futuristic full-stack e-commerce platform built as a major project. It integrates Augmented Reality (AR) to revolutionize the online shopping experience.
          </p>
          <div style={{ marginTop: "40px", padding: "30px", background: isDarkMode ? '#1e1e1e' : '#f9f9f9', borderRadius: "15px", display: "inline-block", boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: "#2a9d8f", marginBottom: "10px" }}>Developed By</h3>
            <p style={{ fontSize: "1.8rem", fontWeight: "bold", margin: "0" }}>Meghana</p>
            <p style={{ marginTop: "5px" }}>Full-Stack Web Developer</p>
            <hr style={{ margin: "20px 0", border: "0", borderTop: "1px solid #ddd" }} />
            <p style={{ fontSize: "0.95rem" }}><strong>Tech Stack:</strong> MongoDB, Express.js, React, Node.js (MERN), A-Frame (AR)</p>
          </div>
        </main>
      )}

      {currentPage === 'cart' && (
        <main className="main-content" style={{ minHeight: "50vh" }}>
          <h2>Your Shopping Cart 🛒</h2>
          {cartCount === 0 ? (
            <p style={{ fontSize: "18px" }}>Your cart is empty. Add some futuristic products!</p>
          ) : (
            <div>
              <p style={{ fontSize: "20px", marginBottom: "20px" }}>You have <strong>{cartCount}</strong> items in your cart.</p>
              <button className="buy-btn" style={{ width: "200px" }} onClick={handleCheckout}>Proceed to Checkout</button>
            </div>
          )}
        </main>
      )}

      {currentPage === 'success' && (
        <main className="main-content" style={{ minHeight: "50vh", textAlign: "center", paddingTop: "50px" }}>
          <h1 style={{ fontSize: "50px", margin: "0" }}>✅</h1>
          <h2 style={{ color: "#2a9d8f", marginTop: "10px" }}>Order Placed Successfully!</h2>
          <p style={{ fontSize: "18px" }}>Your order ID is <strong>#NEXAR{Math.floor(Math.random() * 10000)}</strong>.</p>
          <button className="buy-btn" style={{ width: "200px", marginTop: "20px" }} onClick={() => setCurrentPage('home')}>Continue Shopping</button>
        </main>
      )}

      {arModel && (
        <div className="ar-modal">
          <div className="ar-modal-content">
            <button className="close-btn" onClick={() => setArModel(null)}>❌ Close</button>
            <model-viewer src={arModel} ar ar-modes="webxr scene-viewer quick-look" camera-controls auto-rotate style={{ width: '100%', height: '400px', backgroundColor: '#f0f0f0' }}></model-viewer>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;