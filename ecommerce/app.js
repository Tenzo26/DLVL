const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use('/api',orderRoutes);




const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
});

mongoose.connect(
  process.env.MONGO_URI,
  {useNewUrlParser: true,
    useCreateIndex: true
}
)
.then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
});





