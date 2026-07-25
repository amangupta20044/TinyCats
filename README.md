# Tiny Cats

Tiny Cats is a full-stack project that helps users discover cat breeds and find suitable cats based on their home environment. The project combines a Node.js/Express backend, a Model Context Protocol (MCP) server, and a React frontend that will provide a user-friendly experience for browsing, searching, and recommending cats.

## Project Overview

This application is built around a simple idea:

- Store cat data in a MongoDB database.
- Expose APIs to create, list, search, and recommend cats.
- Use an MCP server to provide structured tool-based recommendations.
- Build a React frontend so users can interact with the system through a modern web interface.

The project is useful for people who want to explore cat breeds and find a cat that fits their lifestyle, especially for families, apartment dwellers, or people looking for a low-maintenance companion.

---

## Project Structure

```text
TinyCats/
├── backend/
│   ├── src/
│   │   ├── app.ts
│   │   ├── server.ts
│   │   ├── config/
│   │   ├── controller/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── types/
│   └── package.json
├── mcp_server/
│   ├── src/
│   │   └── tools/
│   └── package.json
└── frontend/
    └── (to be created with React)
```

---

## Backend

The backend is built with:

- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- dotenv for environment variables

### Main Features

The backend currently provides these API routes:

- GET /api/cats -> Get all cats
- GET /api/cats/:id -> Get one cat by ID
- GET /api/cats/search/all?q=... -> Search cats by name or breed
- POST /api/cats/create -> Create a new cat
- POST /api/cats/recommend -> Recommend cats based on filters
- POST /api/aiRecommend/recommendByAi -> AI-based recommendation route
- POST /api/mcp -> MCP-related test route

### Backend Flow

1. A client sends a request to the Express server.
2. The route forwards the request to a controller.
3. The controller calls a service.
4. The service interacts with the MongoDB model.
5. The result is returned as a JSON response.

This follows a clean layered structure:

- routes -> handle incoming API endpoints
- controller -> process request/response logic
- services -> business logic
- models -> database interaction

---

## MCP Server

The MCP server is a separate service that provides tool-based functionality for the application. It is designed to support AI or tool-driven recommendations by exposing structured logic that can be used by the system.

### Purpose of MCP Server

The MCP server helps the project extend beyond simple REST APIs by allowing tool-based interactions such as:

- retrieving cat recommendations
- processing preferences
- exposing structured tool endpoints for AI workflows

This makes the project more modular and future-ready for AI integration.

---

## Frontend (Planned)

The frontend will be built using React.js and will provide a visual interface for the entire application.

### Expected frontend pages and features

1. Home Page
   - Welcome screen for Tiny Cats
   - Short introduction to the project
   - Navigation to browse and search cats

2. Cat Catalog Page
   - Display all cats in cards or a grid layout
   - Show details such as name, breed, description, age/lifespan, energy level, and friendliness

3. Search Page
   - Search cats by name or breed
   - Filter results dynamically

4. Recommendation Page
   - Let users choose preferences like:
     - kids friendly
     - apartment friendly
   - Show matching cats based on those preferences

5. Add Cat Page
   - Allow admins or users to add new cats into the database

### What the frontend will do at the end

At the end of the frontend implementation, the user will be able to:

- browse the cat collection visually
- search for cats quickly
- see recommendations based on home conditions
- add new cat records to the system
- interact with the app without using raw API requests

This will turn the backend and MCP server into a complete full-stack application.

---

## Setup Instructions

### 1. Clone the project

```bash
git clone <repository-url>
cd TinyCats
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a .env file inside the backend folder with values like:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/tinycats
```

Start the backend:

```bash
npm run dev
```

### 3. MCP server setup

```bash
cd ../mcp_server
npm install
npm run dev
```

### 4. Frontend setup

```bash
cd ../frontend
npm install
npm run dev
```

---

## Technologies Used

### Backend
- Express.js
- TypeScript
- Mongoose
- MongoDB
- dotenv

### MCP Server
- TypeScript
- MCP SDK

### Frontend (planned)
- React.js
- Vite
- CSS

---

## Future Improvements

Possible next steps for this project:

- Build a polished React UI
- Add authentication for admin users
- Add image upload support
- Add filters for age, energy level, and color
- Improve AI-based recommendations
- Add a detail page for each cat
- Add pagination and sorting

---

## Summary

Tiny Cats is a modern full-stack web app that combines backend APIs, an MCP server, and a future React frontend to create a complete cat recommendation platform. The project demonstrates how to build a real application with separate services, structured routes, and scalable architecture.
