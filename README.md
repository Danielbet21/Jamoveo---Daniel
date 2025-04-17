# 🎶 JaMoveo – Full Stack Music Session App

**JaMoveo** is a full-stack web app built for the Moveo band, helping musicians rehearse smarter. Each musician logs in from their phone and sees synchronized lyrics/chords based on their instrument. The admin controls the session live.

The app is built with **Flask + React + MongoDB**, using **Socket.IO** for real-time updates and **JWT** for authentication.

---

## 🚀 Live Demo
##  [https://jamoveo-daniel.vercel.app](https://jamoveo-daniel.vercel.app)
- 🔗 **Frontend (React + Vite)**:  


- 🔗 **Backend API (Flask + Socket.IO)**:  
  [http://jamoveo-daniel-production.up.railway.app](http://jamoveo-daniel-production.up.railway.app)

---

## 🧪 Usage Instructions

- Sign up as a **player**:  
  `/signup`

- Sign up as an **admin**:  
  `/admin/signup`

- Log in:  
  - Player: `/login`  
  - Admin: `/admin/login`
    
**You can register as many admins & players as you want**

Once logged in:
- Admin can search songs and launch sessions.
- All connected users will see the selected song update live.
- Singers see **only lyrics**, other instruments see **lyrics + chords**.
- Auto-scroll and smoke-friendly large text are included.

---

## 🔐 Auth & Security

- **JWT (JSON Web Tokens)** is used for secure login sessions.
- Tokens are stored in local storage and verified on the backend.
- Separate routes and logic for `admin` and `player` users.

---

## 🧱 Project Structure

```plaintext
JaMoveo/
├── backend/         → Python Flask server with Socket.IO
│   ├── routes/
│   ├── models/
│   ├── dal.py       → Data access layer (MongoDB)
│   ├── auth.py      → JWT handling
│   ├── __init__.py     
│   └── app.py
│
├── frontend/       → Vite + React + css frontend
│   ├── pages/
│   ├── styles/
│   ├── services/   → api.js sets up a pre-configured axios instance of API requests
│   ├── context/    → React context for user auth
│   ├── socket/     → Socket.IO client setup
│   ├── main.jsx
│   └── App.jsx
```

---

## 🐳 Docker

- The backend runs in a **Docker container** with a custom `Dockerfile`.
- It exposes port `5000`, handles environment variables, and connects to MongoDB.
- Docker makes it easy to deploy via **Railway**.

---

## 🛠️ Tech Stack

| Layer       | Tech                            |
|-------------|---------------------------------|
| Frontend    | React, Vite,  CSS               |
| Backend     | Python, Flask, Flask-SocketIO   |
| Auth        | JWT                             |
| Database    | MongoDB                         |
| Realtime    | Socket.IO                       |
| DevOps      | Docker, Railway, Vercel         |
