import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router'
import { useAuth } from '../store/authStore'
import toast from 'react-hot-toast'
import { formCard, formTitle, inputClass, labelClass, navBrandClass, navLinkActiveClass, navLinkClass, pageBackground, submitBtn } from '../styles/common'

function Login() {
  const {register,handleSubmit,formState:{errors}} = useForm()
  const navigate = useNavigate() 
  const login = useAuth(state=>state.login)
  const currentUser = useAuth(state=>state.currentUser)
  const isAuthenticated = useAuth(state=>state.isAuthenticated)
  const error = useAuth(state=>state.error)
  const loading = useAuth(state=>state.loading)
   
  const submit= async (userObj)=>{
    
    await login(userObj)
    toast.success("Logged in Successfully")
    // console.log(currentUser)
    // console.log(isAuthenticated)
    // console.log(error)
    
  }
    useEffect(()=>{
      console.log(currentUser)
    console.log(isAuthenticated)
      
      if(isAuthenticated && currentUser)
    {
      if(currentUser.role === "USER")
      {
        navigate('/userdashboard',{state: currentUser})
      }
      else if(currentUser.role === "AUTHOR")
      {
        navigate('/authordashboard',{state: currentUser})
      }
      else if(currentUser.role === "ADMIN")
      {
        navigate('/admindashboard',{state: currentUser})
      } 
    }
    },[isAuthenticated,currentUser,navigate])
    
  if(loading===true)
    {
      return <p className='text-center text-2xl text-blue-300 '>Loading...</p>
    }

  return (
    <div className={pageBackground}>
      <h1 className={formTitle}> Login </h1>
      {error && <p className='text-center text-2xl text-red-500 mb-4'>{error}</p>}
      <form onSubmit={handleSubmit(submit)} className={formCard}>
        
        {/* <p className='inline m-3'>Select Role</p>
        <input type="radio" {...register("role",{required:true})} value="user" /><label className='m-2'>User</label>
        <input type="radio" {...register("role",{required:true})} value="author" /><label className='m-2'>Author</label>
        <input type="radio" {...register("role",{required:true})} value="admin" /><label className='m-2'>Admin</label><br />
        {errors.role?.type === 'required' && <p className='text-red-400'>Please select a role</p>} */}
        <label className={labelClass}>Email</label>
        <input type="text" {...register("email",{required:true})} placeholder='Email' className={inputClass}/><br /><br />
        {errors.email?.type === 'required' && <p className='text-red-400'>Email is required</p>}
        <label className={labelClass}>Password</label>
        <input type="password" {...register("password",{required:true})} placeholder='Password' className={inputClass}/><br /><br />
        {errors.password?.type === 'required' && <p className='text-red-400'>Password is required</p>}
        <NavLink className={navLinkActiveClass} >Forgot Password?</NavLink>
        <button type="submit" className={submitBtn}>Login</button>
        <label className={navLinkClass}>Don't have an Account? <NavLink className={navLinkActiveClass}>Create One</NavLink></label>
      </form>
    </div>
  )
}

export default Login