# 🍬 Mithai Magic — Sweet Shop Management System

Mithai Magic is a full-stack Sweet Shop Management System built using modern web technologies.  
The application allows users to browse and purchase sweets, while admins can manage inventory through a secure admin panel.

The project is designed with scalability, clean architecture, and security in mind, following real-world development practices.

---

## 🚀 Features

### 👤 User Features
- User registration and login
- JWT-based authentication
- Browse available sweets
- Search and filter sweets
- Add sweets to cart
- View cart with quantity management
- Responsive UI for mobile and desktop

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
- Buy button disabled when stock is zero

---

## 🧱 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
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

root
├── backend
│ ├── src
│ │ ├── controllers
│ │ ├── routes
│ │ ├── services
│ │ ├── middleware
│ │ ├── models
│ │ ├── seeds
│ │ └── app.js
│ ├── server.js
│ └── package.json
│
├── frontend
│ ├── src
│ │ ├── components
│ │ ├── context
│ │ ├── pages
│ │ ├── api
│ │ └── main.jsx
│ └── package.json
│
└── README.md


---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

git clone <repository-url>
cd <project-folder>




---


🔐 Authentication Flow

Users can register and log in

JWT token is stored in localStorage

Token is verified on page reload using /api/auth/me

Admin role is assigned only to the seeded admin account





---

🧁 API Endpoints

Auth
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
GET	/api/auth/me	Get logged-in user

Sweets
Method	Endpoint	Description
GET	/api/sweets	Get all sweets
GET	/api/sweets/search	Search sweets
POST	/api/sweets	Add sweet (Admin)
PUT	/api/sweets/:id	Update sweet (Admin)
DELETE	/api/sweets/:id	Delete sweet (Admin)

Inventory
Method	Endpoint	Description
POST	/api/sweets/:id/purchase	Purchase sweet
POST	/api/sweets/:id/restock	Restock sweet (Admin)




----


🛒 Cart & Checkout

1]Cart

Cart is implemented on the frontend using React Context

Users can add sweets to cart

Quantity can be increased or decreased

Cart count is visible in the navbar

Cart UI is responsive



2]Checkout

Checkout is intentionally kept as a placeholder

Backend purchase API is implemented and tested separately

Payment and order workflows were outside the scope of the assignment

Current checkout behavior:

Checkout coming soon

The cart architecture allows easy integration of checkout logic in the future.




---




🧪 Testing
Backend

Unit tests written using Jest

APIs tested manually using Postman

Run tests:

npm test

Frontend

Manual UI testing

State management and routing verified


---



🤖 My AI Usage
AI Tools Used

ChatGPT

How AI Was Used

Generating initial boilerplate

Debugging issues

UI/UX refinements


---


Reflection

AI was used as a development assistant to improve productivity.

All AI-generated suggestions were reviewed and manually adapted to ensure correctness and originality.


