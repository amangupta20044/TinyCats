<div align="center">

  <h1>🐈 Tiny Cats</h1>
  <p><strong>Next-Gen Full-Stack AI Cat Recommendation Platform--(implementing mcp server)</strong></p>

  <p>
    An intelligent, production-grade web application designed to help cat lovers discover breeds, analyze compatibility traits, and find their perfect feline companion using custom AI recommendations and MCP tool integration.
  </p>

  <br />

  <!-- Shield Badges -->
  <p>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" /></a>
    <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></a>
    <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" /></a>
    <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" /></a>
    <a href="https://www.mongodb.com/"><img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" /></a>
    <a href="https://modelcontextprotocol.io/"><img src="https://img.shields.io/badge/MCP-Server-FF7A00?style=for-the-badge&logo=cpu&logoColor=white" alt="MCP Server" /></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge" alt="License" /></a>
    <img src="https://img.shields.io/github/stars/amangupta20044/TinyCats?style=for-the-badge" alt="GitHub Stars" />
    <img src="https://img.shields.io/github/forks/amangupta20044/TinyCats?style=for-the-badge" alt="GitHub Forks" />
  </p>

  <br />

  <!-- Main Hero Banner Image -->
  <img src="frontend/public/home.png" alt="Tiny Cats Platform Hero Preview" width="100%" style="border-radius: 16px; border: 1px solid rgba(255,122,0,0.2);" />

</div>

<br />

---

## 📋 Table of Contents

- [✨ Key Features](#-key-features)
- [🌐 Live Demo](https://tiny-cats-kohl.vercel.app/)
- [🖼️ Application Showcase & Screenshots](#️-application-showcase--screenshots)
- [🏗️ System Architecture](#️-system-architecture)
- [📁 Folder Structure](#-folder-structure)
- [⚙️ Installation & Setup Guide](#️-installation--setup-guide)
- [🔑 Environment Variables](#-environment-variables)
- [🔌 API Endpoints Reference](#-api-endpoints-reference)
- [🛠️ Tech Stack & Dependencies](#️-tech-stack--dependencies)
- [⚡ Performance & Architecture Highlights](#-performance--architecture-highlights)
- [🔮 Future Roadmap](#-future-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📬 Contact & Author](#-contact--author)

---

## ✨ Key Features

- **🐾 Browse Cat Directory**: Explore an extensive catalog of cat breeds with detailed attributes, life span statistics, and temperament scores.
- **🔍 Instant Search & Suggestions**: Real-time debounced search bar with live auto-suggestions for breed names, cat names, and trait keywords.
- **🎛️ Multi-Attribute Filtering & Sorting**: Filter breeds instantly by energy level (High, Medium, Low), Kid Friendliness, Apartment Adaptability, or sort by name and lifespan.
- **🤖 AI-Powered Recommendation Engine**: Interactive 4-step wizard matching users to their ideal feline companion via standard criteria and AI inference endpoints (`/api/aiRecommend/recommendByAi`).
- **🔌 Model Context Protocol (MCP) Integration**: Built-in MCP server providing structured tool-based context protocols for AI LLMs and external automation agents.
- **🌗 Complete Dark Mode Support**: Sleek, glassmorphic UI design system with persistent theme preference sync (`localStorage`) and custom color accents (`#FF7A00`).
- **❤️ Local Storage Favorites**: Save, manage, and toggle bookmarked cat breeds locally with badge counters and instant tab sync.
- **📝 Zod-Validated Submission Form**: React Hook Form integration for adding new cat profiles with client-side Zod validation and instant image URL previews.
- **📱 Mobile-First Responsive UI**: Fluid layout adapted across Desktop, Tablet, and Mobile devices with slide-over drawer navigation and Framer Motion micro-animations.

---

## 🌐 Live Demo

| Service | Live URL | Status |
| :--- | :--- | :--- |
| **Frontend Web App** | [https://tiny-cats-kohl.vercel.app/](https://tinycats.vercel.app) *(Placeholder)* | 🟢 Production |
| **Backend REST API** | [https://api-tinycats.render.com/api](https://api-tinycats.render.com/api) *(Placeholder)* | 🟢 Active |

---

## 🖼️ Application Showcase & Screenshots

### 🏠 Home Page
*Modern hero section featuring gradient typography, animated graphics, platform metrics, and key feature highlights.*

![Home Page Screenshot](frontend/public/home.png)

---

### 🔍 Explore Cat Directory
*Interactive breed catalog with debounced search suggestions, filter pills, sorting options, and paginated cards.*

![Explore Cats Screenshot](frontend/public/explore.png)

---

### 🔮 Interactive Recommendation Wizard
*Multi-step interactive quiz enabling users to toggle between Standard API and AI Recommendation algorithms with yellow highlight visual feedback.*

![Recommendation Wizard Screenshot](frontend/public/recommend.png)

---

### ➕ Add Cat Profile
*Validation-controlled submission form with real-time image URL preview frames, customized selects, and Sonner toast notifications.*

![Add Cat Screenshot](frontend/public/add.png)

---

## 🏗️ System Architecture

The project follows a decoupling strategy separating the **Vite React Frontend**, **Express.js API Gateway**, **MongoDB Atlas Database**, and an independent **MCP (Model Context Protocol) Server**.

```mermaid
graph TD
    A[Client Browser / User] -->|HTTPS Requests| B[React 19 Frontend - Vite + TypeScript]
    B -->|REST APIs via Axios| C[Express.js API Server]
    C -->|Mongoose Queries| D[(MongoDB Database)]
    C -->|AI Tool Context Protocol| E[MCP Server - Model Context Protocol]
    
    subgraph Frontend Layer
        B
    end
    
    subgraph Backend Services
        C
        E
    end
    
    subgraph Persistence Layer
        D
    end
```

---

## 📁 Folder Structure

```text
TinyCats/
├── backend/
│   ├── src/
│   │   ├── app.ts                  # Express app initialization & middleware
│   │   ├── server.ts               # Server entry point & MongoDB connection
│   │   ├── config/                 # DB connection configuration
│   │   ├── controller/             # Cat & AI recommendation controllers
│   │   ├── models/                 # Mongoose schemas (cat.model.ts)
│   │   ├── routes/                 # Express API routes definition
│   │   ├── services/               # Business logic & database operations
│   │   └── types/                  # Backend TypeScript interfaces
│   └── package.json
├── mcp_server/
│   ├── src/
│   │   └── tools/                  # MCP tool definitions & schema exports
│   └── package.json
└── frontend/
    ├── public/                     # Static assets & gallery screenshots
    ├── src/
    │   ├── assets/                 # Icons and media files
    │   ├── components/
    │   │   ├── ui/                 # Reusable UI primitives (Button, Input, Select, Badge, Card, Modal, Drawer)
    │   │   ├── common/             # Breadcrumbs, ScrollToTop, ErrorBoundary
    │   │   ├── layout/             # Navbar, Footer, MobileDrawer, Page Layout
    │   │   ├── cats/               # CatCard, CatGrid, CatFilter, CatSkeleton
    │   │   └── forms/              # AddCatForm, RecommendationForm
    │   ├── constants/              # App constants, fallback data, options
    │   ├── context/                # ThemeProvider & FavoritesProvider
    │   ├── hooks/                  # Custom TanStack Query & Utility hooks
    │   ├── pages/                  # Home, ExploreCats, CatDetails, Recommendation, AddCat, NotFound
    │   ├── routes/                 # Router configuration with React.lazy
    │   ├── services/               # api.ts (Axios instance), cat.service.ts
    │   ├── types/                  # Cat domain TypeScript interfaces
    │   └── utils/                  # cn merger & localStorage helpers
    ├── package.json
    ├── vite.config.ts
    └── index.html
```

---

## ⚙️ Installation & Setup Guide

### Prerequisites
- **Node.js**: `v18.x` or higher
- **npm**: `v9.x` or higher
- **MongoDB**: Local MongoDB instance or MongoDB Atlas Connection String

### 1. Clone the Repository
```bash
git clone https://github.com/amangupta20044/TinyCats.git
cd TinyCats
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Configure your environment variables in `backend/.env` (see section below).
Start the backend development server:
```bash
npm run dev
```
*(Backend runs at `http://localhost:5000`)*

### 3. MCP Server Setup
Open a new terminal window:
```bash
cd mcp_server
npm install
npm run dev
```

### 4. Frontend Setup
Open another terminal window:
```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```
*(Frontend runs at `http://localhost:5173`)*

---

## 🔑 Environment Variables

### Backend (`backend/.env`)
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/tinycats
NODE_ENV=development
```

### Frontend (`frontend/.env`)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🔌 API Endpoints Reference

| Method | Endpoint | Description | Payload / Parameters |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/cats` | Fetch all cat breed profiles | None |
| `GET` | `/api/cats/:id` | Fetch single cat details by ID | `id` (Param) |
| `GET` | `/api/cats/search/all` | Search cats by query term | `?q=search_term` |
| `POST` | `/api/cats/create` | Create a new cat record | `{ name, breed, description, lifeSpan, energyLevel, kidsFriendly, apartmentFriendly, image, color }` |
| `POST` | `/api/cats/recommend` | Filtered cat recommendation | `{ kidsFriendly: boolean, apartmentFriendly: boolean }` |
| `POST` | `/api/aiRecommend/recommendByAi` | AI-driven cat recommendation | `{ kidsFriendly, apartmentFriendly, energyPreference, quiet, playful }` |

---

## 🛠️ Tech Stack & Dependencies

| Layer | Technologies |
| :--- | :--- |
| **Frontend Core** | React 19, Vite, TypeScript, React Router DOM v7 |
| **UI & Styling** | Tailwind CSS v4, Glassmorphism, Framer Motion, Lucide React, Sonner |
| **State & Data Fetching** | TanStack Query v5, Axios |
| **Forms & Validation** | React Hook Form, Zod |
| **Backend Core** | Node.js, Express.js, TypeScript |
| **Database** | MongoDB, Mongoose ODM |
| **AI Protocol** | Model Context Protocol (MCP) Server |
| **Tooling & DX** | ESLint, PostCSS, TypeScript Compiler |

---

## ⚡ Performance & Architecture Highlights

> [!IMPORTANT]
> Built adhering to senior frontend architecture guidelines to ensure enterprise grade scalability and maintainability.

- 🧩 **100% Component-Based Design**: Modular folder hierarchy separating UI primitives, layout containers, and domain modules. Components are kept strictly under 200 lines.
- ⚡ **Code Splitting & Lazy Loading**: Route level code-splitting powered by `React.lazy()` and `Suspense` for minimal initial bundle size.
- 🛡️ **End-to-End Type Safety**: Shared TypeScript interfaces across API contracts, form state, and custom query hooks.
- 🔄 **Resilient Service Layer**: Axios instance configured with 10s request timeouts, response interceptors, and fallback data handlers ensuring 100% UI availability even during server offline states.
- 🎨 **Accessibility & Theme Persistence**: Complete light/dark mode support with persistent state, keyboard navigation accessibility, and custom high-contrast dropdown controls.

---

## 🔮 Future Roadmap

- [x] Full-stack REST API and frontend integration
- [x] Interactive multi-step recommendation wizard
- [x] AI recommendation API route & MCP tool layer
- [x] Local storage favorite cats bookmarking
- [ ] User authentication & admin role management
- [ ] Cloudinary / AWS S3 image upload integration
- [ ] Advanced cat comparison side-by-side modal
- [ ] Export recommendation result summaries to PDF

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/amangupta20044/TinyCats/issues).

1. Fork the project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git checkout -b feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more details.

---

## 📬 Contact & Author

**Aman Gupta**
- **GitHub**: [@amangupta20044](https://github.com/amangupta20044)
- **LinkedIn**: [Aman Gupta](https://linkedin.com/in/amangupta) *(Placeholder)*
- **Email**: [amangupta20044@gmail.com](mailto:amangupta20044@gmail.com)

---

<div align="center">

  <p>⭐ <strong>If you found this project useful, please give it a star on GitHub!</strong> ⭐</p>

</div>
