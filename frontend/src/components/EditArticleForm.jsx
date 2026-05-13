import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import axiosInstance from "../api/axiosConfig";
import { toast } from "react-hot-toast";

import {
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  errorClass,
  articlePageWrapper,
} from "../styles/common";

function EditArticle() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const article = location.state;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // prefill form
  useEffect(() => {
    if (!article) return;

     setValue("title", article.title);
     setValue("category", article.category);
     setValue("content", article.content);
  }, [article]);

  const updateArticle = async (data) => {
    console.log(data);
    data.articleId = article._id;
    let res = await axiosInstance.put("/author-api/articles", data);
    console.log("res update atricle", res);
    navigate(`/article`, {
      state: res.data.payload,
    });
  };

  return (
    <div className={`${formCard} mt-10`}>
      <h2 className={formTitle}>Edit Article</h2>

      <form onSubmit={handleSubmit(updateArticle)}>
        {/* Title */}
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
        <button className={submitBtn}>Update Article</button>
      </form>
    </div>
  );
}

export default EditArticle;
