require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const bookingRoutes = require('./routes/bookings');
const reviewRoutes = require('./routes/reviews');
const paymentsRoutes = require('./routes/payment');
const adminRoutes = require('./routes/admin');

const authentication = require('./src/middleware/authentication');
const authorization = require('./src/middleware/authorization');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', authentication, userRoutes);
app.use('/api/v1/rides', authentication, bookingRoutes);
app.use('/api/v1/reviews', authentication, reviewRoutes);
app.use('/api/v1/payments', authentication, paymentsRoutes);
app.use('/api/v1/admin', authorization, authentication, adminRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
