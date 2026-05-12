import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {useNavigate} from 'react-router'

function Register() {
  const {register,handleSubmit,formState:{errors}} = useForm()
  let [preview, setPreview] = useState(null)
  let [loading,setLoading] =useState(false)
  let [error,setError] = useState(null)
  let navigate = useNavigate()
  const onRegister = async(newUser)=>{
    setLoading(true)

    newUser.role = newUser.role.toUpperCase();

    let apiUrl = ""
    if(newUser.role === "USER")
    {
      apiUrl = "http://localhost:4000/user-api/users"
    }
    else if (newUser.role === "AUTHOR"){
      apiUrl = "http://localhost:4000/author-api/users"
    }
    console.log(newUser)

    try{
      // Create form data object
        const formData = new FormData();
        //get user object
        let { role, profileImageUrl, ...userObj } = newUser;
        //add all fields except profilePic to FormData object
        Object.keys(userObj).forEach((key) => {
        formData.append(key, userObj[key]);
        });
        // add profilePic to Formdata object
        formData.append("profileImageUrl", profileImageUrl[0]);
      let res = await fetch(apiUrl,{
        method:"POST",
        body: formData
      })
    if(res.status===201)
    {
      navigate('/login')
    }
    else
    {
      console.log(res)
      throw new Error("Failed to Fetch")
    }
  }
    catch(err)
    {
      setError(err)
    }
    finally
    {
      setLoading(false)
    }
  }
  if(loading===true)
    {
      return <p className='text-center text-2xl text-blue-300 '>Loading...</p>
    }
    if(error!==null)
    {
      return <p className='text-center text-2xl text-red-500'>{error.message}</p>
    }
    

  return (
    <div className='bg-gray-300 text-center min-h-screen p-20'>
      <form onSubmit={handleSubmit(onRegister)}>
        <p className='inline m-3'>Select Role</p>
        <input type="radio" {...register("role",{required:true})} value="user" /><label className='m-2'>User</label>
        <input type="radio" {...register("role",{required:true})} value="author" /><label className='m-2'>Author</label><br />
        {errors.role?.type === 'required' && <p className='text-red-400'>Please select a role</p>}

        <input type="text" {...register("firstName",{required:true})} placeholder='First Name' className='border p-1 m-2'/><br />
        {errors.firstName?.type === 'required' && <p className='text-red-400'>First Name is required</p>}

        <input type="text" {...register("lastName")} placeholder='Last Name' className='border p-1 m-2'/><br />
        <input type="text" {...register("email",{required:true,unique:true})} placeholder='Email' className='border p-1 m-2'/><br />
        {errors.email?.type === 'required' && <p className='text-red-400'>Email is required</p>}
        {errors.email?.type === 'unique' && <p className='text-red-400'>Email already exists</p>}
        <input type="password" {...register("password",{required:true})} placeholder='Password' className='border p-1 m-2 mb-3'/><br />
        {errors.password?.type === 'required' && <p className='text-red-400 mb-4'>Password is required</p>}
        <div className="text-center my-6">
        <label 
            htmlFor="profile-upload" 
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
        >
            Upload Profile Pic
        </label>

        <input 
            type="file" 
            id="profile-upload" 
            className="hidden" 
            accept="image/png, image/jpeg"
            {...register("profileImageUrl", {
                onChange: (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        if (!["image/jpeg", "image/png"].includes(file.type)) {
                            setError(new Error("Only JPG or PNG allowed"));
                            return;
                        }
                        if (file.size > 2 * 1024 * 1024) {
                            setError(new Error("File size must be less than 2MB"));
                            return;
                        }
                        setPreview(URL.createObjectURL(file));
                        setError(null);
                    }
                }
            })} 
        />
      </div>

      {/* 7. The Preview Image Element */}
      {preview && (
        <div className="mt-3 flex justify-center">
            <img
                src={preview}
                alt="Profile Preview"
                className="w-24 h-24 object-cover rounded-full border border-gray-300"
            />
        </div>
      )}
        <button type="submit" className='bg-blue-400 p-2 rounded mt-5'>Register</button>
      </form>
    </div>
  )
}

export default Register
