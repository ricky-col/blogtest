# 🎨 Blog App Frontend

A modern, interactive frontend for the MERN Blog Application, built with React and Vite.

## 🚀 Tech Stack
- **Library**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Forms**: React Hook Form
- **API Client**: Axios

## 📁 Project Structure

```text
frontend/
├── src/
│   ├── api/            # Centralized API configuration (Axios)
│   ├── components/     # React components & Pages
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── UserDashboard.jsx
│   │   ├── AuthorArticles.jsx
│   │   └── Article.jsx
│   ├── store/          # Zustand store for Auth & Global state
│   ├── styles/         # Shared Tailwind CSS utility classes
│   ├── App.jsx         # Main routing & Layout
│   └── main.jsx        # App entry point
├── .env                # Environment variables
└── vite.config.js      # Vite configuration
```

## 🔐 Environment Variables
Create a `.env` file in the root of the `frontend` folder:
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

## 🛠️ Installation & Running
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## ✨ Key Features
- **Role-Based Access**: Distinct dashboards for Users and Authors.
- **Rich Interactions**: Smooth page transitions and staggering grid animations using Framer Motion.
- **Responsive Design**: Mobile-friendly layout using Tailwind CSS.
- **Efficient State**: Lightweight state management with Zustand for user authentication.
