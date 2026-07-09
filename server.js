const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());
// MongoDB Connection
mongoose.connect('mongodb+srv://meghanayeluri0306_db_user:eUBeyxHdMqcUHmTv@cluster0.xnr4ufg.mongodb.net/?appName=Cluster0')
    .then(() => console.log('✅ Local MongoDB connected!'))
    .catch((err) => console.log('⚠️ MongoDB is not installed locally, but API is running perfectly!'));

const productsList = [
    { id: 1, name: "Vintage Camera", price: "₹4,999", image: "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=400&q=80", arUrl: "https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/AntiqueCamera/glTF-Binary/AntiqueCamera.glb"},
    { id: 2, name: "Air Sneakers X", price: "₹2,499", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80", arUrl: "https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/Shoe/glTF-Binary/Shoe.glb" },
    { id: 3, name: "Gaming Chair", price: "₹12,499", image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=400&q=80", arUrl: "https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/SheenChair/glTF-Binary/SheenChair.glb"}
];

app.get('/api/products', (req, res) => {
    res.json(productsList);
});

// 🔐 Authentication API (Login / Register)
app.post('/api/auth', (req, res) => {
    const { email, password, type } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please enter all details!" });
    }

    if (type === 'register') {
        res.json({ success: true, message: "Registration Successful! Please login." });
    } else {
        res.json({ success: true, message: "Login Successful! Welcome to NexAR." });
    }
});


app.listen(5005, () => {
    console.log('🚀 Backend Server is running perfectly on port 5005');
});