require('dotenv').config(); // Load environment variables 
const express = require('express');
const app = express();

// Use the port from .env or default to 3000 if not found 
const port = process.env.PORT || 3000;
const serviceName = process.env.SERVICE_NAME || 'unknown-service';

// Middleware to parse JSON bodies (Replaces body-parser) 
app.use(express.json());

// Logger Middleware 
app.use((req, res, next) => { 
    console.log(`[${new Date().toISOString()}] ${req.method} 
${req.url} - IP: ${req.ip}`); 
    next(); 
});

// In-memory database (for now) 
const users = []; 
 
// POST: Create a new user 
app.post('/api/users', (req, res) => { 
    const userData = req.body; 
 
    // Basic Validation 
    if (!userData.name || !userData.email) { 
        return res.status(400).json({ error: 'Name and Email are required' }); 
    } 
    const newUser = { 
        id: users.length + 1, 
        name: userData.name, 
        email: userData.email, 
        createdAt: new Date().toISOString() 
    }; 
    users.push(newUser); 
    res.status(201).json(newUser); 
}); 
// GET: Retrieve all users 
app.get('/api/users', (req, res) => { 
    res.json(users); 
}); 

// Health Check Endpoint 
app.get('/health', (req, res) => { 
res.status(200).json({ 
status: 'UP', 
uptime: process.uptime(), 
timestamp: new Date().toISOString() 
}); 
}); 

app.listen(port, () => {
    console.log(`${serviceName} running on port ${port}`);
}); 