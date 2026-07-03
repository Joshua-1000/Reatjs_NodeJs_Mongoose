# React + Node.js + MongoDB Product Management App

A full-stack CRUD application for managing products. The project uses React and Vite on the frontend, Express and Mongoose on the backend, and MongoDB as the database.

## Features

- Create, view, edit, and delete products
- Product form with name, quantity, price, and image support
- REST API for product operations
- Responsive UI styled with Tailwind CSS
- React Router-based pages for home, create, and edit

## Tech Stack

- Frontend: React, TypeScript, Vite, React Router, Tailwind CSS, Axios
- Backend: Node.js, Express.js, Mongoose, CORS
- Database: MongoDB

## Project Structure

```text
backend/
  models/
  server.js
frontend/
  src/
    components/
    pages/
  index.html
```

## Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- MongoDB (local or Atlas)

## Installation

1. Clone the repository
2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

## Environment Variables

Create a `.env` file inside the backend folder and add your MongoDB connection string:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/products
PORT=5000
```

If you are using MongoDB Atlas, set `MONGODB_URI` to your Atlas connection string instead.

## Running the Application

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend:

```bash
cd frontend
npm run dev
```

- Frontend will run at: http://localhost:5173
- Backend API will run at: http://localhost:5000

## API Endpoints

The backend exposes these endpoints:

- `GET /products` or `GET /api/products` - Get all products
- `POST /products` or `POST /api/products` - Create a product
- `GET /products/:id` or `GET /api/products/:id` - Get a single product
- `PUT /products/:id` or `PUT /api/products/:id` - Update a product
- `DELETE /products/:id` or `DELETE /api/products/:id` - Delete a product

## Notes

- The backend uses Mongoose to store products in MongoDB.
- The frontend communicates with the backend through Axios.
- The app is designed for learning and practicing full-stack CRUD development.
