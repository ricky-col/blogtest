import React from 'react'
import RootLayout from './components/RootLayout'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import UserDashboard from './components/UserDashboard'
import AuthorDashboard from './components/AuthorDashboard'
import AdminDashboard from './components/AdminDashboard'
import { Toaster } from 'react-hot-toast'
import Article from './components/Article'
import ProtectedRoute from './components/ProtectedRoute'
import AddArticle from './components/AddArticle'
import Unauthorized from './components/Unauthorized'
import AuthorArticles from './components/AuthorArticles'

function App() {
  const routerObj = createBrowserRouter([
    {
      path:'/',
      element:<RootLayout/>,
      children:[{
        path:"",
        element:<Home/>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/register",
        element:<Register/>
      }
    ,
    {
      path: '/userdashboard',
      element: <ProtectedRoute allowedRoles={["USER"]}> <UserDashboard /> </ProtectedRoute> 
    },
    {
      path: '/authordashboard',
      element:<ProtectedRoute allowedRoles={["AUTHOR"]}><AuthorDashboard /></ProtectedRoute>,
      children:[
      {
        index: true,
        element: <Navigate to="articles" replace />
      },
      {
        path: 'articles',
        element: <AuthorArticles/>
      },
      {
        path:'addArticle',
        element: <AddArticle/>
      }] 
    },
    {
      path: '/admindashboard',
      element: <AdminDashboard/>
    },
    {
      path:'/article',
      element:<Article/>
    },
    {
      path: 'unauthorized',
      element: <Unauthorized/>
    }
  ]}
  ])
  return (
    <div>
      <Toaster position='top-center' reverseOrder={false}/>
      <RouterProvider router = {routerObj}/>
    </div>
  )
}

export default App