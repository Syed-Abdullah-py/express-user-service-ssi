# SSI-User-Mgmt

A full-stack user management web application built for **SSI Decisions**. It provides complete CRUD (Create, Read, Update, Delete) operations on users through a minimalist web interface backed by a layered Node.js API and PostgreSQL database.

![Node.js](https://img.shields.io/badge/Node.js-ES%20Modules-green)
![Express](https://img.shields.io/badge/Express-5.x-lightgrey)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Sequelize-blue)
![License](https://img.shields.io/badge/License-ISC-yellow)

---

## Overview

SSI-User-Mgmt is a learning and production-ready starter for managing users. The frontend is plain HTML/CSS with vanilla JavaScript — no build step required. The backend follows a clean, scalable layered architecture that separates HTTP handling, business logic, and database access.

### Features

- Create users with name and email
- List all users with avatar initials and user count
- View individual user profiles (UUID, member since date)
- Edit existing users
- Delete users with confirmation prompt
- SSI-branded UI with logo and red theme
- UUID v4 primary keys for all users
- Environment-based configuration
- Automatic database schema sync on startup

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js (ES Modules) |
| Backend | Express.js 5 |
| ORM | Sequelize 6 |
| Database | PostgreSQL |
| Frontend | HTML, CSS, Vanilla JavaScript |
| Dev tools | Nodemon, dotenv, method-override |

---

## Architecture

The application uses a **layered architecture** where each layer has a single responsibility:

```
Request
   │
   ▼
┌─────────────┐
│   Routes    │  HTTP endpoints & method mapping
└──────┬──────┘
       ▼
┌─────────────┐
│ Controller  │  Request/response handling, redirects
└──────┬──────┘
       ▼
┌─────────────┐
│   Service   │  Validation & business logic
└──────┬──────┘
       ▼
┌─────────────┐
│ Repository  │  Sequelize database operations
└──────┬──────┘
       ▼
┌─────────────┐
│    Model    │  User schema definition
└─────────────┘
```

### Project Structure

```
SSI-User-Mgmt/
├── public/                     # Static frontend
│   ├── assets/
│   │   └── ssi-logo.jpg        # SSI brand logo
│   ├── css/
│   │   └── style.css           # Global styles
│   ├── js/
│   │   └── common.js           # Shared frontend utilities
│   ├── index.html              # Create user page
│   ├── users.html              # User list page
│   ├── user.html               # User detail page
│   └── edit.html               # Edit user page
├── src/
│   ├── config/
│   │   ├── db.js               # Database connection & sync
│   │   └── sequelize.js        # Sequelize instance
│   ├── middleware/
│   │   ├── errorHandler.js     # Global error & 404 handlers
│   │   └── methodOverride.js   # PUT/DELETE from HTML forms
│   ├── modules/user/
│   │   ├── user.model.js       # User schema (UUID, name, email)
│   │   ├── user.repository.js  # Database queries
│   │   ├── user.service.js     # Business logic
│   │   ├── user.controller.js  # HTTP handlers
│   │   └── user.routes.js      # Route definitions
│   ├── utils/
│   │   ├── AppError.js         # Custom error class
│   │   └── validators.js       # Input & UUID validation
│   └── app.js                  # Express app setup
├── server.js                   # Entry point
├── .env.example                # Environment template
└── package.json
```

---

## Database Schema

**Table:** `Users`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | UUID | Primary key, auto-generated (UUID v4) |
| `name` | VARCHAR | NOT NULL |
| `email` | VARCHAR | NOT NULL, UNIQUE |
| `createdAt` | TIMESTAMP | Auto-managed |
| `updatedAt` | TIMESTAMP | Auto-managed |

---

## API Reference

### JSON API (used by frontend `fetch`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/users` | Get all users |
| `GET` | `/api/users/:id` | Get user by UUID |

**Example response:**

```json
{
  "id": "f390e2d2-19f6-4e08-8541-f53c28af681f",
  "name": "Syed Abdullah",
  "email": "s.abdullah@ssidecisions.com",
  "createdAt": "2026-06-23T20:43:18.327Z",
  "updatedAt": "2026-06-23T20:43:18.327Z"
}
```

### Form Routes (HTML form submissions → redirects)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/users` | Create a user |
| `PUT` | `/users/:id` | Update a user |
| `POST` | `/users/:id` | Update a user (fallback) |
| `POST` | `/users/:id/delete` | Delete a user |
| `DELETE` | `/users/:id` | Delete a user (REST) |

Forms use `method-override` for PUT requests. Delete uses a dedicated `/delete` POST route for reliability.

---

## Frontend Pages

| Page | URL | Purpose |
|------|-----|---------|
| Create | `/` | Add a new user |
| Users list | `/users.html` | Browse all users |
| User detail | `/user.html?id={uuid}` | View profile |
| Edit | `/edit.html?id={uuid}` | Update user |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [PostgreSQL](https://www.postgresql.org/download/) installed and running
- [pgAdmin 4](https://www.pgadmin.org/) (optional, for GUI management)

### 1. Clone the repository

```bash
git clone https://github.com/Syed-Abdullah-py/express-user-service-ssi.git
cd express-user-service-ssi
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Copy the example env file and update your values:

```bash
cp .env.example .env
```

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ssi-user-db
DB_USER=postgres
DB_PASS=your_postgres_password
```

### 4. Create the database

Open pgAdmin or `psql` and run:

```sql
CREATE DATABASE "ssi-user-db";
```

The `Users` table is created automatically when the app starts.

### 5. Run the application

**Development (with auto-reload):**

```bash
npm run dev
```

**Production:**

```bash
npm start
```

Open **http://localhost:3000** in your browser.

---

## Troubleshooting

### Port already in use

```powershell
taskkill /F /IM node.exe
npm run dev
```

### Password authentication failed

Ensure `DB_PASS` in `.env` matches the password you set when installing PostgreSQL.

### Cannot POST/PUT/DELETE routes

This usually means an old Node process is running without the latest routes. Kill all Node processes and restart the server.

### Migrating from integer IDs to UUID

On startup, if the existing `Users` table uses integer IDs, it is automatically dropped and recreated with UUID primary keys. **Existing user data will be lost** during this one-time migration.

---

## Error Handling

- **Service layer** throws `AppError` with HTTP status codes (400, 404, 409)
- **API routes** return JSON `{ error: "message" }`
- **Form routes** redirect back with `?error=` query parameter
- **Global middleware** catches unhandled errors and unknown routes

---

## Design Decisions

- **Layered architecture** — easy to test, extend, and add new modules
- **UUID v4** — safer than auto-increment IDs for public-facing URLs
- **Separate API and form routers** — JSON for reads, form POST for writes
- **Dedicated delete route** (`POST /users/:id/delete`) — avoids method-override issues
- **No frontend framework** — zero build step, easy to understand and modify
- **Shared `common.js`** — DRY utilities for all frontend pages

---

## Future Enhancements

- User authentication and authorization
- Pagination and search on the users list
- Input validation middleware (e.g. express-validator)
- Unit and integration tests
- Docker Compose for local development
- API versioning

---

## License

ISC

---

## Author

Built by **SSI Decisions** — [GitHub Repository](https://github.com/Syed-Abdullah-py/express-user-service-ssi)
