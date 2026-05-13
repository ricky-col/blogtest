import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../store/authStore'
import axios from 'axios'
import { motion } from 'framer-motion'
import { 
  pageWrapper, 
  articleCardClass, 
  articleExcerpt, 
  articleTitle, 
  ghostBtn, 
  articleMeta,
  loadingClass,
  errorClass,
  emptyStateClass,
  divider
} from '../styles/common'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
}

function UserDashboard() {
  const navigate = useNavigate()
  const user = useAuth(state => state.currentUser)
  let [loading, setLoading] = useState(false)
  let [error, setError] = useState(null)
  let [articles, setArticles] = useState([])

  useEffect(() => {
    const getArticles = async () => {
      try {
        setLoading(true)
        let res = await axios.get("http://localhost:4000/user-api/articles", { withCredentials: true })
        setArticles(res.data.payload)
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch articles")
      } finally {
        setLoading(false)
      }
    }
    getArticles()
  }, [])

  const getArticle = (articleObj) => {
    navigate('/article', { state: articleObj })
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={pageWrapper}
    >
      {/* Profile Header */}
      <div className='flex justify-between items-center mb-8'>
        <h2 className='text-3xl font-bold text-[#1d1d1f] tracking-tight'>Latest Articles</h2>
        
        <div className='flex items-center gap-4'>
          <p className='text-xl font-semibold text-[#1d1d1f] tracking-tight'>Welcome, {user?.firstName}</p>
          {user?.profileImageUrl ? (
            <img src={user.profileImageUrl} alt="Profile" className='rounded-full w-16 h-16 object-cover shadow-sm border border-[#e8e8ed]'/>
          ) : (
            <div className='rounded-full w-16 h-16 bg-[#e8e8ed] flex items-center justify-center text-[#a1a1a6] text-xl font-medium shadow-sm border border-[#d2d2d7]'>
              {user?.firstName?.[0]?.toUpperCase() || 'U'}
            </div>
          )}
        </div>
      </div>

      <div className={divider}></div>

      {loading && <p className={loadingClass}>Loading articles...</p>}
      {error && <p className={errorClass}>{error}</p>}
      
      {!loading && !error && articles.length === 0 && (
        <div className={emptyStateClass}>No articles available at the moment.</div>
      )}

      {!loading && !error && articles.length > 0 && (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {articles.map((articleObj) => (
            <motion.div 
              key={articleObj._id} 
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}
              whileTap={{ scale: 0.98 }}
              className={`${articleCardClass} relative flex flex-col`}
            >
              <div className="flex flex-col gap-2">
                <p className={articleMeta}>{articleObj.category || 'General'}</p>
                <p className={articleTitle}>{articleObj.title}</p>
                <p className={articleExcerpt}>{articleObj.content.slice(0, 60)}...</p>
              </div>
              <button className={`${ghostBtn} mt-auto pt-4`} onClick={() => getArticle(articleObj)}>
                Read Article →
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}

export default UserDashboard