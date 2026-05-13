import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import axiosInstance from '../api/axiosConfig'
import toast from 'react-hot-toast'
import { formCard, formGroup, inputClass, labelClass, pageBackground, primaryBtn, submitBtn } from '../styles/common'

function AddArticle() {
    const {register,handleSubmit,formState:{errors}} = useForm()
    const navigate = useNavigate()
    const submit = async (obj) =>{
        try {
            let res = await axiosInstance.post("/author-api/articles", obj)
            if (res.status === 201) {
                toast.success("Article created successfully")
                navigate('/authordashboard/articles')
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to create article")
        }
    }
  return (
    <div className={pageBackground}>
      <form onSubmit={handleSubmit(submit)} className={formCard}>
        <div className={formGroup}>
        <label className={labelClass}>Title</label>
        <input type="text" {...register("title",{required:true})} placeholder='Title' className={inputClass}/><br />
        {errors.title?.type === 'required' && <p className='text-red-400'>Title is required</p>}
        </div>
        <div className={formGroup}>
        <label className={labelClass}>Category</label>
        <select {...register("category",{required:true})} id="category" className='m-2 p-1 border'>
            <option value="">Select Category</option>
            <option value="Science">Science</option>
            <option value="Programming">Programming</option>
            <option value="Maths">Maths</option>
            <option value="others">Others</option>
        </select><br />
        {errors.category?.type === 'required' && <p className='text-red-400'>Category is required</p>}
        </div>
        
        <div className={formGroup}>
          <label className={labelClass}>Content</label>

          <textarea
            rows="8"
            className={inputClass}
            placeholder="Write your article content..."
            {...register("content", {
              required: "Content is required",
              minLength: {
                value: 50,
                message: "Content must be at least 50 characters",
              },
            })}
          />
          {errors.content && <p className='text-red-400'>{errors.content.message}</p>}
          </div>
        
        <button type="submit" className={submitBtn}>Publish Article</button>
      </form>
    </div>
  )
}

export default AddArticle