const express = require('express');
const cors = require('cors');
const  connectDB  = require('./config/db.js');
const userRoute = require('./routes/userRoute.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
 connectDB()

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('Server is live...'))
app.use('/api/users', userRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
