import React, { useEffect } from 'react'
import Header from './Header'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import PageTransition from './PageTransition'
import Footer from './Footer'
import Login from './Login'
import Register from './Register'
import AddArticle from './AddArticle'
import { useAuth } from '../store/authStore'
import { loadingClass } from '../styles/common'

function RootLayout() {
  const checkAuth = useAuth(state=>state.checkAuth)
  const loading = useAuth(state=>state.loading)
  const location = useLocation()
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
        <div className='m-10 min-h-screen overflow-x-hidden'>
            <AnimatePresence mode="wait">
              <PageTransition key={location.pathname}>
                <Outlet />
              </PageTransition>
            </AnimatePresence>
            {/* <Login/> */}
            {/* <Register/> */}
            {/* <AddArticle/> */}
        </div>
        <Footer/>
    </div>
    
  )
}

export default RootLayout