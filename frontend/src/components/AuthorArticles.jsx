import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { useNavigate } from "react-router";
import { useAuth } from "../store/authStore";
import { motion } from "framer-motion";

import {
  articleCardClass,
  articleTitle,
  articleExcerpt,
  articleMeta,
  ghostBtn,
  loadingClass,
  errorClass,
  emptyStateClass,
  articleStatusActive,
  articleStatusDeleted,
} from "../styles/common";

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

function AuthorArticles() {
  const navigate = useNavigate();
  const user = useAuth((state) => state.currentUser);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    if (!user) return;

    const getAuthorArticles = async () => {
      setLoading(true);

      try {
        const res = await axiosInstance.get(`/author-api/articles/`);

        setArticles(res.data.payload);
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.error || "Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };

    getAuthorArticles();
  }, [user]);

  const openArticle = (article) => {
    navigate(`/article`, {
      state: article,
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
    });
  };

  if (loading) return <p className={loadingClass}>Loading articles...</p>;
  if (error) return <p className={errorClass}>{error}</p>;

  if (articles.length === 0) {
    return <div className={emptyStateClass}>You haven't published any articles yet.</div>;
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      {articles.map((article) => (
        <motion.div 
          key={article._id} 
          variants={itemVariants}
          whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}
          whileTap={{ scale: 0.98 }}
          className={`${articleCardClass} relative flex flex-col`}
        >
          {/* Status Badge */}
          <span className={article.isArticleActive ? articleStatusActive : articleStatusDeleted}>
            {article.isArticleActive ? "ACTIVE" : "DELETED"}
          </span>

          <div className="flex flex-col gap-2">
            <p className={articleMeta}>{article.category}</p>

            <p className={articleTitle}>{article.title}</p>

            <p className={articleExcerpt}>{article.content.slice(0, 60)}...</p>
          </div>

          <button className={`${ghostBtn} mt-auto pt-4`} onClick={() => openArticle(article)}>
            Read Article →
          </button>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default AuthorArticles;