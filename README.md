---

# ReDeal

A full-stack web application built with **React**, **Node.js**, **Express**, and **PostgreSQL**.
The app features **JWT-based authentication**, **protected routes**, and a **modern Tailwind-powered UI**.

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
* .ENV
* Socket.io

---

## Features

* User authentication (Register / Login / Logout)
* JWT-protected routes
* Live chat
* User profiles and settings
* Post creation, editing, and browsing
* Responsive UI with Tailwind CSS
* Welcome Email

---

## Known Issues

* CSS layout breaks in some sections
* Manage posts showing for both buying and selling

---

## Future Improvements

* Production deployment
* Notifications for chat
* RateLimiter
* Pagination
* Proper email verification

---

## Fixes / Improvements Implemented

* Split backend into routes/controllers/services 
* Improved error handling
* UI consistency fixes
* Archived post details do not display correctly when clicked
* .ENV file not loading before config files
* Welcome Email
* Live chat implementation
* Latest chats dont jump to begining 

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
│   ├── node_modules/
│   ├── public/
│   │   └── styles.css
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   ├── logo.png
│   │   │   ├── logo.svg
│   │   │   └── send.svg
│   │   │
│   │   ├── chat/
│   │   │   ├── ChatDetails.jsx
│   │   │   ├── ConversationItem.jsx
│   │   │   ├── ConversationList.jsx
│   │   │   ├── MessageBubble.jsx
│   │   │   ├── MessageInput.jsx
│   │   │   └── MessageList.jsx
│   │   │
│   │   ├── components/
│   │   │   ├── settings/
│   │   │   │   ├── AccountSettings.jsx
│   │   │   │   ├── AppearanceSettings.jsx
│   │   │   │   ├── SecuritySettings.jsx
│   │   │   │   ├── Settings.jsx
│   │   │   │   └── SettingsSidebar.jsx
│   │   │   │
│   │   │   ├── AccDropdown.jsx
│   │   │   ├── ArchivedItem.jsx
│   │   │   ├── Carousel.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── FormattedDateTime.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Item.jsx
│   │   │   └── Sidebar.jsx
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

## Notes

* Frontend and backend are fully separated
* Authentication state is handled using React Context
* Protected routes are enforced client-side and server-side
* `temp/` is used for temporary files and uploads

---

