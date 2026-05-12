import React, { useEffect } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Login from './Login'
import Register from './Register'
import AddArticle from './AddArticle'
import { useAuth } from '../store/authStore'
import { loadingClass } from '../styles/common'
function RootLayout() {
  const checkAuth = useAuth(state=>state.checkAuth)
  const loading = useAuth(state=>state.loading)
  useEffect(()=>{
    checkAuth()
  },[])
  if(loading)
  {
    return <p className={loadingClass}>Loading...</p>
  }
  return (
    <div>
        <Header/>
        <div className='m-10 min-h-screen'>
            <Outlet />
            {/* <Login/> */}
            {/* <Register/> */}
            {/* <AddArticle/> */}
        </div>
        <Footer/>
    </div>
    
  )
}

export default RootLayout