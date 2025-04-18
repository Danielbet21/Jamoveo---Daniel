# 🎸 JaMoveo – Rehearsal Room Web App 🎶

**JaMoveo** is a real-time collaborative app that helps Moveo's internal band rehearse smarter. Musicians log in, choose their instruments, and follow song lyrics and chords live – all synchronized by the admin via Socket.IO.

---

## 🚀 Live Deployment

[Open JaMoveo](http://104.155.152.39)


---

## 📜 Pages

### 👥 Authentication
- Signup with username, password, and instrument.
- Separate signup/login routes for Admin and regular users.
- Secure authentication using **JWT (JSON Web Tokens)** & **Bearer token**.

### 🧑‍🎤 Admin Panel
- Search songs by title/artist (English/Hebrew).
- Select a song from results to broadcast to all players.
- Control the live session (start/stop, quit session).

### 🎵 Live Session
- Real-time song display (lyrics + chords or just lyrics for singers).
- Auto-scroll mode for lyrics during rehearsal.
- High-contrast, large font display for visibility in smoky room.
- Players return to lobby when admin ends session.

### 🎧 Player lobby
- starts as a waiting room until the admin choose a song
- all the logged-in  users seeing the same song
- singers see lyrics only while others seeing chords & lyrics 
---

## 🧰 Tech Stack

| Layer     | Tech                          |
|-----------|-------------------------------|
| Frontend  | React + Vite +  CSS           |
| Backend   | Python Flask + Flask-SocketIO |
| Database  | MongoDB                       |
| Realtime  | WebSockets (Socket.IO)        |
| Deployment| Docker + GDC (Google)         |


---

## 🔐 Creating Users

| Role   | How to Register                    |
|--------|------------------------------------|
| Admin  | `/admin/signup`                    |
| Player | `/signup`                          |

---
