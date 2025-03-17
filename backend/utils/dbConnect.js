const mongoose = require('mongoose');

module.exports = () => mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to Mongo'))
.catch((error) => console.error('DB connection error:', error));