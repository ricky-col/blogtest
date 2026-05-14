# 📝 Blog App Backend

The backend of the MERN Blog Application, built with Node.js, Express, and MongoDB Atlas.

## 🚀 Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas (Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT) & Bcrypt
- **File Storage**: Cloudinary (via Multer)

## 📁 Project Structure

```text
backend/
├── APIs/             # Express Routers
│   ├── UserAPI.js    # User-specific routes (read articles, comment)
│   ├── AuthorAPI.js  # Author-specific routes (create, edit, delete articles)
│   ├── AdminAPI.js   # Admin-specific routes
│   └── commonAPI.js  # Shared routes (Login, Logout, Password Change)
├── Models/           # Mongoose Schemas & Models
│   ├── UserModel.js
│   └── ArticleModel.js
├── Services/         # Shared Business Logic
│   └── AuthService.js # Registration & Login logic
├── Middlewares/      # Custom Middlewares
│   └── verifyToken.js # JWT validation & Role-based access
├── config/           # Third-party configurations
│   ├── cloudinary.js
│   └── multer.js
├── server.js         # Main entry point & DB connection
└── .env              # Environment variables (not tracked by Git)
```

## 🔐 Environment Variables
Create a `.env` file in the root of the `backend` folder with the following:
```env
DB_URL=your_mongodb_atlas_uri
PORT=4000
JWT_SECRET=your_secret_key
CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

## 🛠️ Installation & Running
1. `cd backend`
2. `npm install`
3. `npm start` (or `npx nodemon server` for development)

## 📡 API Architecture
The app follows a modular router-based architecture where each role (User, Author, Admin) has its own dedicated API file, while shared authentication logic is centralized in the `Services` layer.