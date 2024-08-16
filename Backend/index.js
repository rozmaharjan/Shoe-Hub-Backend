// importing
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cloudinary = require('cloudinary');
const acceptMultimedia = require('connect-multiparty');
const connectDB = require('./database/db');
const session = require('express-session'); 
const MongoStore = require('connect-mongo'); 

// Making express app
const app = express();

// dotenv config
dotenv.config();

// cloudinary config
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(acceptMultimedia());
app.use(express.urlencoded({ extended: true }));

// cors config to accept request from frontend
const corsOptions = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));

// mongodb connection
connectDB();

// Accepting json data
app.use(express.json());

// Configure session middleware
app.use(session({
    secret: '8b9c0655ed590561963bdcf13d370e2fdc693014204106fc72f5aa19cf81f4719c5542eb7869ca39cf8116d7ba71d3a6f49fa3303f03df45b7d0dd9c2dbb77c1', 
    resave: false,
    saveUninitialized: false, 
    store: MongoStore.create({ 
        mongoUrl: process.env.DB_URL, 
        ttl: 14 * 24 * 60 * 60
    }),
    cookie: {
        secure: process.env.NODE_ENV === 'production', 
        httpOnly: true,
        sameSite: 'strict', 
        maxAge: 14 * 24 * 60 * 60 * 1000 
    }
}));


// creating test route
app.get("/test", (req, res) => {
    res.status(200).send("Hello");
});

// user route
app.use('/api/user', require('./routes/userRoutes'));

app.use('/api/products', require('./routes/productRoutes'))



// defining port
const PORT = process.env.PORT;
// run the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// exporting app
module.exports = app;
