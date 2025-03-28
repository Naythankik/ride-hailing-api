require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const PORT = process.env.PORT || 3000;
const connection = require('./config/database');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const bookingRoutes = require('./routes/bookings');
const reviewRoutes = require('./routes/reviews');
const paymentsRoutes = require('./routes/payment');
const adminRoutes = require('./routes/admin');

const authentication = require('./src/middleware/authentication');
const authorization = require('./src/middleware/authorization');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connection();

app.use('/api/v1/ride-hailing/auth', authRoutes)
app.use('/api/v1/ride-hailing/user', authentication, userRoutes);
app.use('/api/v1/ride-hailing/rides', authentication, bookingRoutes);
app.use('/api/v1/ride-hailing/reviews', authentication, reviewRoutes);
app.use('/api/v1/ride-hailing/payments', authentication, paymentsRoutes);
app.use('/api/v1/ride-hailing/admin', authorization, authentication, adminRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
