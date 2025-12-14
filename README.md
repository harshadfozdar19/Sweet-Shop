# 🍬 Mithai Magic — Sweet Shop Management System

Mithai Magic is a **full-stack Sweet Shop Management System** built using modern web technologies.  
The application allows users to browse sweets, manage a cart, and purchase items, while admins can securely manage inventory.

The project is designed with **scalability, clean architecture, security, and real-world practices** in mind.

---

## 🚀 Features

### 👤 User Features
- User registration and login
- JWT-based authentication
- Persistent login using `/api/auth/me`
- Browse available sweets
- Search and filter sweets
- Add sweets to cart
- Cart quantity management
- Buy button disabled when stock is zero
- Responsive UI (mobile & desktop)

### 🛠️ Admin Features
- Automatic master admin creation on server startup
- Add new sweets
- Update sweet details
- Delete sweets
- Restock inventory
- Admin-protected routes

### 📦 Inventory Management
- Purchase API decreases stock
- Restock API increases stock
- Real-time stock updates on UI

### 🛒 Cart
- Cart implemented using React Context
- Add / remove items
- Update quantities
- Cart count visible in navbar
- Cart drawer UI
- Checkout intentionally skipped (explained below)

---

## 🧱 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (MongoDB Atlas)
- Mongoose
- JWT Authentication
- bcrypt
- Jest

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Context API
- Axios

---

## 📁 Project Structure

<img width="446" height="647" alt="image" src="https://github.com/user-attachments/assets/f319cef2-4108-48c2-ae19-09277138ecab" />

yaml
Copy code

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository


```bash
git clone https://github.com/harshadfozdar19/Sweet-Shop.git
cd Sweet-Shop
```
---
2️⃣ Backend Setup
---


```bash
//Copy code
cd backend
npm install
```
---
Create a .env file:
---

env
```
//Copy code
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@sweetshop.com
ADMIN_PASSWORD=admin123
```
---
Start backend:

```bash
//Copy code
npm start
```
---
Backend runs at:


http://localhost:5000

---

3️⃣ Frontend Setup
---


```bash
//Copy code
cd frontend
npm install
npm run dev
```

---
Frontend runs at:

```
//Copy code
http://localhost:5173
```
---
🔐 Authentication Flow
---

Users can register and log in

JWT token is stored in localStorage

On page reload, frontend verifies token via:


GET /api/auth/me

Invalid or expired tokens are cleared automatically

Admin role is assigned only to the seeded admin account


---
🧁 API Endpoints
---

Auth
---

POST	---/api/auth/register---	Register user

POST	---/api/auth/login---	Login user

GET	---/api/auth/me	---Get logged-in user


---
Sweets
---

GET	---/api/sweets---	Get all sweets

GET	---/api/sweets/search---	Search sweets

POST	---/api/sweets---	Add sweet (Admin)

PUT	---/api/sweets/:id---	Update sweet (Admin)

DELETE	---/api/sweets/:id---	Delete sweet (Admin)


---

Inventory
---

POST	---/api/sweets/:id/purchase---	Purchase sweet

POST	---/api/sweets/:id/restock---	Restock sweet (Admin)

---

💰 Price Handling
---

Prices are stored as numbers in the database

Displayed on UI as:

₹200 / kg

This ensures accurate cart calculations and future checkout readiness

---

🛒 Cart & Checkout
---

Cart

Implemented using React Context

Add/remove sweets

Quantity updates

Cart drawer UI

Cart count visible in navbar

Checkout (Intentionally Skipped)
Backend purchase API is implemented and tested

Payment gateway and order workflow were out of scope

Checkout button currently shows a placeholder message

Architecture allows easy future integration

---

🧪 Testing
---

Backend

Unit tests written using Jest

APIs tested manually using Postman

Run tests:

```bash
Copy code
npm test
```

---
Frontend

Manual UI testing

Routing, auth, cart, and admin flows verified


---

🌍 Deployment
---

Backend


Deployed on Render

MongoDB Atlas used for database

Environment variables configured via Render dashboard

---

Frontend

Ready for deployment on Vercel

Uses environment-based API URLs


---

🤖 My AI Usage
---

AI Tools Used: 
ChatGPT


How AI Was Used:

Generating initial boilerplate

Debugging issues

UI/UX refinement

Architecture discussions

---

Reflection
---
AI was used as a development assistant to improve productivity.

All suggestions were reviewed, adapted, and manually implemented to ensure correctness and originality.

📌 Final Notes
No public admin creation endpoint

Secure role-based access control

Clean and scalable architecture

Production-ready codebase

✨ Thank you for reviewing Mithai Magic!

---

screen shots of UI:
---


<img width="1918" height="912" alt="image" src="https://github.com/user-attachments/assets/3278826d-0b0e-4068-806c-db334d16460a" />

<img width="1892" height="912" alt="image" src="https://github.com/user-attachments/assets/27e0ebc8-7507-4d8d-939a-f97ddc00e449" />

<img width="1897" height="911" alt="image" src="https://github.com/user-attachments/assets/db3584c5-c4cb-44ec-819c-7c13c0a79e36" />

<img width="1901" height="908" alt="image" src="https://github.com/user-attachments/assets/ba91852d-f560-47bd-8b8d-f61797acd40c" />

<img width="1897" height="913" alt="image" src="https://github.com/user-attachments/assets/780357bf-a0c6-4a02-86a9-10b123a7bdb2" />

<img width="1902" height="913" alt="image" src="https://github.com/user-attachments/assets/aa2b4fa4-18d7-43b2-8fef-9835f793cb6e" />


---


screen shots of test cases:
---

<img width="773" height="513" alt="image" src="https://github.com/user-attachments/assets/f7426599-bfc3-4451-80fd-c55125d293a8" />





