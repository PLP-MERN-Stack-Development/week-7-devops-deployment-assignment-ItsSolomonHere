
# MERN Blog Application 📝

A full-featured blog application built using the **MERN** stack (MongoDB, Express, React, Node.js). This app allows users to register, log in, create posts, view articles, comment, and filter posts by categories.

---
## 🌟 Features

- 🔐 User Authentication (JWT-based)
- 📝 Create, Read, Update, Delete (CRUD) for Blog Posts
- 🗂️ Category filtering with dropdown
- 💬 Commenting system
- 📷 Image upload with preview
- 🔍 Search functionality
- ⚙️ Admin features (optional)
- 📱 Responsive UI with Tailwind CSS

---

## 📸 Screenshots

| Login Page | Register Page | Home Page |
| :---: | :---: | :---: |
| ![Login Page](client/screenshots/Screenshot%20from%202025-07-09%2018-47-55.png) | ![Register Page](client/screenshots/Screenshot%20from%202025-07-09%2018-48-20.png) | ![Home Page](client/screenshots/Screenshot%20from%202025-07-09%2018-48-39.png) |


---

## 🚀 Tech Stack

**Frontend:**
- React (Vite)
- Tailwind CSS
- Axios
- React Router
- `react-hook-form` for form validation
- `sonner` for toast notifications
- `lucide-react` for icons

**Backend:**
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- Multer (for image uploads)
- JSON Web Token (JWT)
- `bcryptjs` for password hashing
- `joi` for data validation
- `express-rate-limit` for rate limiting

---

## 📁 Folder Structure

```
mern-blog/
│
├── client/ # React Frontend
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/
│ │ ├── hooks/
│ │ └── App.jsx
│ └── package.json
│
├── server/ # Node.js Backend
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── middleware/
│ └── server.js
│
├── .env.example
├── README.md
└── package.json
```

---

## ⚙️ Setup Instructions

### 🔧 Prerequisites
- Node.js (v18 or higher recommended)
- pnpm (or npm/yarn)
- MongoDB (local instance or a cloud-based solution like MongoDB Atlas)

---

### 🖥️ Backend Setup

1.  **Navigate to the server directory:**
    ```bash
    cd server
    ```
2.  **Install dependencies:**
    ```bash
    pnpm install
    ```
3.  **Create a `.env` file in the `server/` directory and add the following environment variables. You can use `.env.example` as a template.**
    ```env
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```
4.  **Run the server in development mode:**
    ```bash
    pnpm run dev
    ```
    The server will be running on `http://localhost:5000`.

---

### 🌐 Frontend Setup

1.  **Navigate to the client directory:**
    ```bash
    cd client
    ```
2.  **Install dependencies:**
    ```bash
    pnpm install
    ```
3.  **Create a `.env.local` file in the `client/` directory and add the following environment variable:**
    ```env
    VITE_API_URL=http://localhost:5000
    ```
4.  **Start the development server:**
    ```bash
    pnpm run dev
    ```
    The client will be running on `http://localhost:5173`.

---

## 📜 Available Scripts

### Server (`server/`)
- `pnpm start`: Starts the server in production mode.
- `pnpm dev`: Starts the server in development mode with `nodemon` for hot-reloading.
- `pnpm test`: Runs the test suite (if configured).

### Client (`client/`)
- `pnpm dev`: Starts the Vite development server.
- `pnpm build`: Builds the client for production.
- `pnpm lint`: Lints the source code using ESLint.
- `pnpm preview`: Previews the production build locally.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the repository
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.

