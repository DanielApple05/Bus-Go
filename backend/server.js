require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const routeRoutes = require('./routes/routes');
const busRoutes = require('./routes/buses');
const bookingRoutes = require('./routes/bookings');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/routes', routeRoutes);
app.use('/buses', busRoutes);
app.use('/', bookingRoutes); // handles /availability, /booking, /confirm-booking

app.get('/', (req, res) => res.send('Bus Booking API running'));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
