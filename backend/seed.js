require('dotenv').config();
const mongoose = require('mongoose');
const Route = require('./models/Route');

const routes = [
  // Lagos
  { from: 'Lagos', to: 'Abuja', price: 24000, durationHours: 8 },
  { from: 'Lagos', to: 'Port Harcourt', price: 28000, durationHours: 10 },
  { from: 'Lagos', to: 'Kano', price: 32000, durationHours: 14 },
  { from: 'Lagos', to: 'Ibadan', price: 6000, durationHours: 2 },
  { from: 'Lagos', to: 'Benin City', price: 12000, durationHours: 5 },
  { from: 'Lagos', to: 'Enugu', price: 18000, durationHours: 8 },
  { from: 'Lagos', to: 'Owerri', price: 20000, durationHours: 9 },
  { from: 'Lagos', to: 'Abeokuta', price: 4000, durationHours: 1.5 },

  // Abuja
  { from: 'Abuja', to: 'Lagos', price: 24000, durationHours: 8 },
  { from: 'Abuja', to: 'Port Harcourt', price: 22000, durationHours: 7 },
  { from: 'Abuja', to: 'Kano', price: 15000, durationHours: 5 },
  { from: 'Abuja', to: 'Kaduna', price: 8000, durationHours: 3 },
  { from: 'Abuja', to: 'Enugu', price: 15000, durationHours: 6 },
  { from: 'Abuja', to: 'Jos', price: 10000, durationHours: 4 },
  { from: 'Abuja', to: 'Ilorin', price: 14000, durationHours: 5 },

  // Port Harcourt
  { from: 'Port Harcourt', to: 'Lagos', price: 28000, durationHours: 10 },
  { from: 'Port Harcourt', to: 'Abuja', price: 22000, durationHours: 7 },
  { from: 'Port Harcourt', to: 'Enugu', price: 12000, durationHours: 4 },
  { from: 'Port Harcourt', to: 'Owerri', price: 8000, durationHours: 2.5 },
  { from: 'Port Harcourt', to: 'Uyo', price: 7000, durationHours: 2 },
  { from: 'Port Harcourt', to: 'Calabar', price: 9000, durationHours: 3 },
  { from: 'Port Harcourt', to: 'Warri', price: 8000, durationHours: 3 },

  // Kano
  { from: 'Kano', to: 'Lagos', price: 32000, durationHours: 14 },
  { from: 'Kano', to: 'Abuja', price: 15000, durationHours: 5 },
  { from: 'Kano', to: 'Kaduna', price: 6000, durationHours: 2 },
  { from: 'Kano', to: 'Jos', price: 9000, durationHours: 4 },
  { from: 'Kano', to: 'Ilorin', price: 20000, durationHours: 8 },

  // Ibadan
  { from: 'Ibadan', to: 'Lagos', price: 6000, durationHours: 2 },
  { from: 'Ibadan', to: 'Abuja', price: 20000, durationHours: 7 },
  { from: 'Ibadan', to: 'Ilorin', price: 8000, durationHours: 3 },
  { from: 'Ibadan', to: 'Benin City', price: 10000, durationHours: 4 },
  { from: 'Ibadan', to: 'Abeokuta', price: 3000, durationHours: 1 },
  { from: 'Ibadan', to: 'Enugu', price: 16000, durationHours: 7 },

  // Benin City
  { from: 'Benin City', to: 'Lagos', price: 12000, durationHours: 5 },
  { from: 'Benin City', to: 'Abuja', price: 18000, durationHours: 6 },
  { from: 'Benin City', to: 'Port Harcourt', price: 14000, durationHours: 5 },
  { from: 'Benin City', to: 'Warri', price: 5000, durationHours: 1.5 },
  { from: 'Benin City', to: 'Enugu', price: 13000, durationHours: 5 },
  { from: 'Benin City', to: 'Ibadan', price: 10000, durationHours: 4 },

  // Enugu
  { from: 'Enugu', to: 'Lagos', price: 18000, durationHours: 8 },
  { from: 'Enugu', to: 'Abuja', price: 15000, durationHours: 6 },
  { from: 'Enugu', to: 'Port Harcourt', price: 12000, durationHours: 4 },
  { from: 'Enugu', to: 'Owerri', price: 6000, durationHours: 2 },
  { from: 'Enugu', to: 'Calabar', price: 11000, durationHours: 4 },
  { from: 'Enugu', to: 'Benin City', price: 13000, durationHours: 5 },

  // Kaduna
  { from: 'Kaduna', to: 'Abuja', price: 8000, durationHours: 3 },
  { from: 'Kaduna', to: 'Kano', price: 6000, durationHours: 2 },
  { from: 'Kaduna', to: 'Jos', price: 7000, durationHours: 3 },
  { from: 'Kaduna', to: 'Lagos', price: 30000, durationHours: 13 },

  // Owerri
  { from: 'Owerri', to: 'Lagos', price: 20000, durationHours: 9 },
  { from: 'Owerri', to: 'Port Harcourt', price: 8000, durationHours: 2.5 },
  { from: 'Owerri', to: 'Enugu', price: 6000, durationHours: 2 },
  { from: 'Owerri', to: 'Uyo', price: 6000, durationHours: 2 },
  { from: 'Owerri', to: 'Abuja', price: 20000, durationHours: 8 },

  // Uyo
  { from: 'Uyo', to: 'Port Harcourt', price: 7000, durationHours: 2 },
  { from: 'Uyo', to: 'Owerri', price: 6000, durationHours: 2 },
  { from: 'Uyo', to: 'Calabar', price: 5000, durationHours: 1.5 },
  { from: 'Uyo', to: 'Lagos', price: 26000, durationHours: 11 },
  { from: 'Uyo', to: 'Abuja', price: 24000, durationHours: 9 },

  // Calabar
  { from: 'Calabar', to: 'Port Harcourt', price: 9000, durationHours: 3 },
  { from: 'Calabar', to: 'Uyo', price: 5000, durationHours: 1.5 },
  { from: 'Calabar', to: 'Enugu', price: 11000, durationHours: 4 },
  { from: 'Calabar', to: 'Lagos', price: 25000, durationHours: 11 },
  { from: 'Calabar', to: 'Abuja', price: 23000, durationHours: 9 },

  // Warri
  { from: 'Warri', to: 'Benin City', price: 5000, durationHours: 1.5 },
  { from: 'Warri', to: 'Port Harcourt', price: 8000, durationHours: 3 },
  { from: 'Warri', to: 'Lagos', price: 15000, durationHours: 6 },
  { from: 'Warri', to: 'Abuja', price: 19000, durationHours: 7 },

  // Ilorin
  { from: 'Ilorin', to: 'Lagos', price: 9000, durationHours: 4 },
  { from: 'Ilorin', to: 'Abuja', price: 14000, durationHours: 5 },
  { from: 'Ilorin', to: 'Ibadan', price: 8000, durationHours: 3 },
  { from: 'Ilorin', to: 'Kano', price: 20000, durationHours: 8 },

  // Jos
  { from: 'Jos', to: 'Abuja', price: 10000, durationHours: 4 },
  { from: 'Jos', to: 'Kaduna', price: 7000, durationHours: 3 },
  { from: 'Jos', to: 'Kano', price: 9000, durationHours: 4 },
  { from: 'Jos', to: 'Lagos', price: 27000, durationHours: 12 },

  // Abeokuta
  { from: 'Abeokuta', to: 'Lagos', price: 4000, durationHours: 1.5 },
  { from: 'Abeokuta', to: 'Ibadan', price: 3000, durationHours: 1 },
  { from: 'Abeokuta', to: 'Abuja', price: 21000, durationHours: 7.5 },
  { from: 'Abeokuta', to: 'Benin City', price: 11000, durationHours: 4.5 },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Route.deleteMany({}); // clear old routes before reseeding
    await Route.insertMany(routes);
    console.log(`Seeded ${routes.length} routes`);
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  }
};

seed();