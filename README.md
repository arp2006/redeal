---

# ReDeal

A full-stack web application built with **React**, **Node.js**, **Express**, and **PostgreSQL**.
The app features **JWT-based authentication**, **protected routes**, and a **modern Tailwind-powered UI**.

---

## Live Demo

https://redeal-rust.vercel.app/

---

## Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* React Router

### Backend

* Node.js
* Express
* PostgreSQL
* JWT Authentication
* bcrypt
* Cloudinary
* CORS
* dotenv
* Socket.io

### DevOps & Containerization

* Docker
* Docker Compose

---

## Features

* User authentication (Register / Login / Logout)
* JWT-protected API routes
* Real-time messaging using Socket.io
* Marketplace listings (create, edit, browse)
* User profiles and account settings
* Image uploads via Cloudinary
* Responsive UI built with Tailwind CSS
* Docker containerization for easy deployment

---

## Known Issues

* CSS layout breaks in some sections
* Mobile Mode not working
* Dark mode not working
* Manage posts showing for both buying and selling

---

## Planned Improvements

* Chat notifications
* API rate limiting
* Pagination for listings and chats
* Email verification system
* Improved mobile responsiveness
* Elasticsearch
* Jenkins (CI/CD pipeline)

---

## Major Improvements Implemented

* Refactored backend into routes / controllers / services architecture
* Implemented centralized error handling
* Fixed environment variable loading order
* Implemented real-time chat with Socket.io
* Added welcome email system
* Improved UI consistency
* Fixed conversation ordering in chat
* Production deployment setup
* Docker containerization

---

## Project Structure

```
project-root/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── cloudinary.js
│   │   │   ├── db.js
│   │   │   ├── env.js
│   │   │   └── resend.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── chat.controller.js
│   │   │   ├── item.controller.js
│   │   │   ├── upload.controller.js
│   │   │   └── user.controller.js
│   │   │
│   │   ├── emails/
│   │   │   ├── emailHandlers.js
│   │   │   └── emailTemplate.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── requireAuth.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── chat.routes.js
│   │   │   ├── item.routes.js
│   │   │   ├── upload.routes.js
│   │   │   └── user.routes.js
│   │   │
│   │   ├── services/
│   │   │   ├── auth.service.js
│   │   │   ├── chat.service.js
│   │   │   ├── item.service.js
│   │   │   └── user.service.js
│   │   │
│   │   ├── app.js
│   │   ├── server.js
│   │   └── socket.js
│   │
│   ├── .env
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── querries.sql
│
├── frontend/
│   ├── public/
│   │   └── styles.css
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   ├── logo.png
│   │   │   ├── logo.svg
│   │   │   └── send.svg
│   │   │
│   │   ├── components/
│   │   │   ├── chat/
│   │   │   │   ├── ChatDetails.jsx
│   │   │   │   ├── ConversationItem.jsx
│   │   │   │   ├── ConversationList.jsx
│   │   │   │   ├── MessageBubble.jsx
│   │   │   │   ├── MessageInput.jsx
│   │   │   │   └── MessageList.jsx
│   │   │   │
│   │   │   ├── item/
│   │   │   │   ├── ArchivedItem.jsx
│   │   │   │   └── Item.jsx
│   │   │   │
│   │   │   ├── layout/
│   │   │   │   ├── AccDropdown.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Header.jsx
│   │   │   │   └── Sidebar.jsx
│   │   │   │
│   │   │   ├── settings/
│   │   │   │   ├── AccountSettings.jsx
│   │   │   │   ├── AppearanceSettings.jsx
│   │   │   │   ├── SecuritySettings.jsx
│   │   │   │   ├── Settings.jsx
│   │   │   │   └── SettingsSidebar.jsx
│   │   │   │
│   │   │   ├── ui/
│   │   │   │   └── Carousel.jsx
│   │   │   │
│   │   │   └── utils/
│   │   │       └── FormattedDateTime.jsx
│   │   │
│   │   ├── config/
│   │   │   └── api.js
│   │   │
│   │   ├── pages/
│   │   │   ├── AboutUs.jsx
│   │   │   ├── Account.jsx
│   │   │   ├── ArchivedPost.jsx
│   │   │   ├── Chat.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Create.jsx
│   │   │   ├── EditPost.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── NotFound.jsx
│   │   │   ├── Privacy.jsx
│   │   │   ├── Product.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Search.jsx
│   │   │   ├── SettingsPage.jsx
│   │   │   ├── Success.jsx
│   │   │   └── Tos.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── AuthContext.jsx
│   │   ├── Layout.jsx
│   │   ├── main.jsx
│   │   ├── RequireAuth.jsx
│   │   └── socket.js
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vercel.json
│   └── vite.config.js
│
├── .gitignore
├── docker-compose.yml
└── README.md
```

---

## Getting Started

### Prerequisites

Make sure you have installed:

- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) *(Recommended for containerized setup)*
- [Node.js](https://nodejs.org/) (v18+ recommended) & npm *(for manual local setup)*
- [PostgreSQL](https://www.postgresql.org/) database *(for manual local setup)*

---

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/redeal.git
cd redeal
```

---

### Option A: Running with Docker (Recommended)

1. **Configure Environment Variables**

   Create a `.env` file inside `backend/`:
   ```env
   PORT=3000
   DATABASE_URL=your_postgres_connection_string
   JWT_SECRET=your_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloud
   CLOUDINARY_API_KEY=your_key
   CLOUDINARY_API_SECRET=your_secret
   RESEND_API_KEY=your_email_key
   ```

2. **Initialize Database**

   Execute `backend/querries.sql` against your PostgreSQL database to initialize tables:
   ```bash
   psql -U youruser -d yourdb -f backend/querries.sql
   ```

3. **Build and Run Backend with Docker Compose**

   From the project root:
   ```bash
   docker compose up --build -d
   ```
   The backend API will be available at `http://localhost:3000`.

4. **Run the Frontend**

   In a separate terminal:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The frontend will be running at `http://localhost:5173`.

---

### Option B: Running Locally (Manual Setup)

#### 1. Database Setup

Run the schema file to create the tables in your PostgreSQL instance:
```bash
psql -U youruser -d yourdb -f backend/querries.sql
```

#### 2. Backend Setup

Navigate to the `backend/` directory:
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:
```env
PORT=3000
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
RESEND_API_KEY=your_email_key
```

Start the backend development server:
```bash
npm run dev
```

#### 3. Frontend Setup

In another terminal, navigate to the `frontend/` directory:
```bash
cd frontend
npm install
npm run dev
```

Frontend will run at: `http://localhost:5173`

---

## Notes

* Frontend and backend are fully separated
* Authentication state is managed using React Context
* Protected routes are enforced client-side and server-side
* `temp/` is used for temporary files and uploads
