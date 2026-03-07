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

---

## Features

* User authentication (Register / Login / Logout)
* JWT-protected API routes
* Real-time messaging using Socket.io
* Marketplace listings (create, edit, browse)
* User profiles and account settings
* Image uploads via Cloudinary
* Responsive UI built with Tailwind CSS

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

## Project Structure
```
project-root/
│
├── backend/
│   ├── node_modules/
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
│   ├── temp/
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   └── queries.sql
│
├── frontend/
│   │
│   ├── public/
│   │   └── styles.css
│   │
│   ├── src/
│   │   │
│   │   ├── assets/
│   │   │   ├── logo.png
│   │   │   ├── logo.svg
│   │   │   └── send.svg
│   │   │
│   │   ├── components/
│   │   │   │
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
│   │   │   ├── settings/
│   │   │   │   ├── AccountSettings.jsx
│   │   │   │   ├── AppearanceSettings.jsx
│   │   │   │   ├── SecuritySettings.jsx
│   │   │   │   ├── Settings.jsx
│   │   │   │   └── SettingsSidebar.jsx
│   │   │   │
│   │   │   ├── layout/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── AccDropdown.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── Sidebar.jsx
│   │   │   │
│   │   │   ├── ui/
│   │   │   │   └── Carousel.jsx
│   │   │   │
│   │   │   └── utils/
│   │   │       └── FormattedDateTime.jsx
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
│   └── vite.config.js
│
├── .gitignore
└── README.md
```
---

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js (v18+ recommended)
- PostgreSQL
- npm

---

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/redeal.git
cd redeal
2. Backend Setup
cd backend
npm install
```

Create a .env file inside backend/:
```
PORT=3000
DATABASE_URL=your_postgres_connection
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
RESEND_API_KEY=your_email_key
```
Start the backend server:
```
npm run dev
```
3. Frontend Setup

Open another terminal:
```
cd frontend
npm install
npm run dev
```

Frontend will run at:
http://localhost:5173

4. Database Setup

Run the schema file to create tables:
```
psql -U youruser -d yourdb -f queries.sql
```

## Notes

* Frontend and backend are fully separated
* Authentication state is managed using React Context
* Protected routes are enforced client-side and server-side
* `temp/` is used for temporary files and uploads

---

