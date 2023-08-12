const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();

// cors
app.use(cors());

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use('/', userRoutes);
app.use('/', productRoutes);
app.use('/', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3004, () => {
    console.log('Server is running on port 3000');
});
