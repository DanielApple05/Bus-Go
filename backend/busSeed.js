// require('dotenv').config();
// const mongoose = require('mongoose');
// const Route = require('./models/Route');
// const Bus = require('./models/Bus');

// const DAYS_AHEAD = 5; // how many days of buses to generate, starting today

// const busConfigs = [
//   { busType: 'standard', departureTime: '08:00', totalSeats: 32, layout: '2+2' },
//   { busType: 'executive', departureTime: '11:00', totalSeats: 28, layout: '2+2' },
//   { busType: 'luxury', departureTime: '15:00', totalSeats: 24, layout: '2+1' },
// ];

// // Builds a seat array like [{ seatNumber: '1A', status: 'available' }, ...]
// const generateSeats = (totalSeats, layout) => {
//   const rowSize = layout === '2+1' ? 3 : 4;
//   const letters = layout === '2+1' ? ['A', 'B', 'C'] : ['A', 'B', 'C', 'D'];
//   const rows = Math.ceil(totalSeats / rowSize);

//   const seats = [];
//   for (let row = 1; row <= rows; row++) {
//     for (let col = 0; col < rowSize; col++) {
//       if (seats.length >= totalSeats) break;
//       seats.push({
//         seatNumber: `${row}${letters[col]}`,
//         status: Math.random() < 0.15 ? 'booked' : 'available', // ~15% pre-booked for realism
//         heldUntil: null,
//       });
//     }
//   }
//   return seats;
// }

// const seedBuses = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log('Connected to MongoDB');

//     const routes = await Route.find();
//     if (!routes.length) {
//       console.log('No routes found — run "npm run seed" first.');
//       process.exit(1);
//     }

//     await Bus.deleteMany({});

//     const buses = [];
//     const today = new Date();

//     for (const route of routes) {
//       for (let dayOffset = 0; dayOffset < DAYS_AHEAD; dayOffset++) {
//         const departureDate = new Date(today);
//         departureDate.setDate(today.getDate() + dayOffset);
//         departureDate.setHours(0, 0, 0, 0);

//         for (const config of busConfigs) {
//           buses.push({
//             route: route._id,
//             busType: config.busType,
//             departureDate,
//             departureTime: config.departureTime,
//             totalSeats: config.totalSeats,
//             seats: generateSeats(config.totalSeats, config.layout),
//           });
//         }
//       }
//     }

//     await Bus.insertMany(buses);
//     console.log(`Seeded ${buses.length} buses across ${routes.length} routes`);
//     process.exit(0);
//   } catch (err) {
//     console.error('Bus seed failed:', err.message);
//     process.exit(1);
//   }
// };

// seedBuses();