# Task Manager

This is a Node.js/TypeScript backend app with JWT authentication.

## Technologies Used

- Node.js
- TypeScript
- Express
- Drizzle ORM
- JWT (jsonwebtoken)
- bcrypt
- dotenv

##  Project Structure

- `/src` - Main application code
- `/drizzle/schema.ts` - DB schema
- `/utils/db.ts` - DB connection
- `/routes` - API routes
- `.env` - Environment variables

## Setup Instructions

1. **Clone the repo:**

   git clone https://github.com/yourusername/yourproject.git

2. **Install dependencies:**

   npm install

3. **Create `.env` file:**

4. **Run the app:**


## Available Scripts

- `npm run dev` — start development server
- `npm run build` — compile TypeScript
- `npm start` — run compiled JS

## Authentication

- Register: `POST /register`
- Login: `POST /login` → returns JWT token



