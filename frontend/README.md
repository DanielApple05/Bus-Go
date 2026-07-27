

# BusGo 🚌

BusGo is a full-stack bus transportation booking application I built for the **Fullstack Developer Industrial Training Assessment** at **Renaissance Innovation Labs (RIL)**.

Rather than building a simple UI, I wanted to create a booking experience that feels close to a real-world platform. Users can search routes, view available buses, choose their seats, pay securely with Paystack, and track their bookings if they decide to create an account.

Guest checkout is fully supported because I wanted the booking process to be as quick and frictionless as possible.

---

## Features

* Search available routes and buses
* One-way and round-trip bookings
* quick booking using today trips (one-way only) 
* Seat selection with real-time availability
* Automatic 10-minute seat reservation during checkout
* Secure Paystack payment integration
* Guest checkout (no account required)
* User registration and login
* Booking history for registered users
* "Hire a Bus" request form

---

## Tech Stack

### Frontend

* React (Vite)
* React Router
* Tailwind CSS
* Axios
* React Context API

### Backend

* Node.js
* Express
* MongoDB (Mongoose)
* JWT Authentication
* bcrypt
* Paystack API

---

## Running the Project

### Clone the repository

```bash
git clone https://github.com/DanielApple05/Bus-Go
cd bus-go
```

### Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=mongodb+srv://Leinad:$Daniel26@todo-app.t6a6dxc.mongodb.net/BusGo
PAYSTACK_SECRET_KEY=sk_test_2a3caea924af9f8b4839544d6436d5964488134e
JWT_SECRET=my_sercret_or_something_2026
```

Seed the database:

```bash
npm run seed
npm run seed:buses
```

Start the server:

```bash
npm run dev
```

---

### Frontend

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_BASE_URL=https://bus-go-lpcb.onrender.com/api
VITE_PAYSTACK_PUBLIC_KEY=pk_test_9c177e7a58963919e100daae0683237c5761ce4b
```

Start the application:

```bash
npm run dev
```

---

## API Overview

| Method | Endpoint           | Description                             |
| ------ | ------------------ | --------------------------------------- |
| GET    | `/routes`          | Fetch available routes                  |
| GET    | `/availability`    | Get buses for a selected route and date |
| POST   | `/booking`         | Create a booking and reserve seats      |
| POST   | `/confirm-booking` | Verify payment and confirm booking      |
| POST   | `/auth/register`   | Register a new user                     |
| POST   | `/auth/login`      | Log in                                  |
| GET    | `/bookings/mine`   | Retrieve a user's bookings              |

---

## Design Decisions

A few decisions I made while building BusGo:

* Booking a trip doesn't require an account. Users can check out as guests, while registered users get access to their booking history.
* Seats are reserved for 10 minutes during checkout to reduce double bookings. If payment isn't completed, the seats become available again.
* Payments are verified on the backend before any booking is confirmed instead of trusting the frontend.
* I built the backend before the UI so every screen worked with real API data instead of mock data.

---

## Challenges

One of the more interesting parts of this project was managing seat availability while users were checking out. I implemented a temporary seat hold system that automatically releases seats if payment isn't completed within the reservation window.

I also spent time handling authentication, payment verification, and keeping the booking flow simple enough for guest users while still offering additional features for registered users.

---

## Future Improvements

If I continue developing BusGo, I'd like to add:

* Email booking confirmations for hiring a bus
* Booking cancellation and refunds
* Admin dashboard
* Live seat availability updates
* Full return-trip seat selection
* Automated testing

---

## What I Learned

Building BusGo helped me become much more comfortable working across the entire MERN stack by integrating third-party payments, handling authentication, managing application state across multiple pages, and solving real-world problems like seat reservations and booking conflicts.
More importantly, it taught me how to build features with the user experience in mind instead of focusing only on the implementation.
