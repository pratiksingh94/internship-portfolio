require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dbConnect = require('./utils/dbConnect');
const morgan = require("morgan")

const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"))

dbConnect();


app.get('/', (req, res) => {
  res.send('backend 200 OK');
});

app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
