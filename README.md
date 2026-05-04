# Portfolio CMS — MERN Full-Stack System

A production-ready personal portfolio + admin CMS built with MongoDB, Express, React, and Node.js.

---

## Project Structure

```
Port_kawsar/
├── backend/          # Express REST API + MongoDB
├── frontend/         # Public portfolio website (Vite + React + Tailwind)
└── admin/            # Admin dashboard CMS (Vite + React + Tailwind)
```

---

## Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- npm

---

## Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env — set MONGODB_URI and JWT_SECRET
npm run seed        # Seeds admin user + sample data
npm run dev         # Starts on http://localhost:5000
```

### 2. Portfolio Frontend

```bash
cd frontend
npm install
npm run dev         # Starts on http://localhost:5173
```

### 3. Admin Dashboard

```bash
cd admin
npm install
npm run dev         # Starts on http://localhost:5174
```

---

## Default Admin Credentials

```
Username: admin
Password: admin123
```

Change these after first login by editing the MongoDB `users` collection.

---

## API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/login` | No | Login and get JWT |
| GET | `/api/auth/me` | Yes | Get current user |
| GET | `/api/profile` | No | Get portfolio profile |
| PUT | `/api/profile` | Yes | Update profile |
| GET | `/api/projects` | No | List all projects |
| POST | `/api/projects` | Yes | Create project |
| PUT | `/api/projects/:id` | Yes | Update project |
| DELETE | `/api/projects/:id` | Yes | Delete project |
| GET | `/api/skills` | No | List all skills |
| POST | `/api/skills` | Yes | Create skill |
| PUT | `/api/skills/:id` | Yes | Update skill |
| DELETE | `/api/skills/:id` | Yes | Delete skill |

---

## Features

### Portfolio Website
- Animated typing effect in Hero
- Scroll-triggered fade animations
- Glassmorphism card design
- Skill progress bars by category
- Project filtering by category
- Fully responsive (mobile-first)
- Dark theme with cyan/violet gradient accents

### Admin Dashboard
- JWT authentication with auto-logout on token expiry
- Profile editor (bio, titles, links, image)
- Projects CRUD with modal forms
- Skills CRUD with proficiency slider
- Dashboard stats overview
- Category filtering

---

## Environment Variables

**backend/.env**
```
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_random_secret_here
PORT=5000
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
```

**Optional — frontend/.env and admin/.env**
```
VITE_API_URL=http://localhost:5000/api
```
(Only needed if not using the Vite proxy, e.g. for production builds.)

---

## Deployment Notes

- Deploy backend to Railway / Render / VPS — set env vars
- Deploy frontend and admin to Vercel / Netlify — set `VITE_API_URL`
- Use MongoDB Atlas for the production database
- Change `JWT_SECRET` to a random 256-bit string in production
- Remove default admin credentials (re-seed with secure password)
