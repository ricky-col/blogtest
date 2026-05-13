import React from 'react';
import { NavLink } from 'react-router';
import { motion } from 'framer-motion';
import { pageBackground, primaryBtn, secondaryBtn } from '../styles/common';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

function Home() {
  return (
    <div className={`${pageBackground} flex flex-col min-h-[calc(100vh-52px)]`}>
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex flex-col items-center justify-center text-center px-6 py-24 md:py-32 bg-gradient-to-b from-white to-[#f5f5f7]"
      >
        <motion.div 
          variants={itemVariants}
          className="inline-block mb-6 px-4 py-1.5 rounded-full bg-[#0066cc]/10 text-[#0066cc] text-[0.7rem] font-bold tracking-widest uppercase shadow-sm"
        >
          Welcome to the Future of Publishing
        </motion.div>
        
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl font-extrabold text-[#1d1d1f] tracking-tight max-w-4xl leading-[1.1] mb-6"
        >
          Ideas that <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066cc] to-[#3385ff]">ignite</span> the world.
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-[#6e6e73] max-w-2xl mb-10 leading-relaxed font-medium"
        >
          Discover incredible stories, insights, and ideas from passionate writers around the globe. Join our community and start your journey today.
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <NavLink to="/register" className={`${primaryBtn} px-8 py-3.5 text-base shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center`}>
            Start Writing
          </NavLink>
          <NavLink to="/login" className={`${secondaryBtn} bg-white px-8 py-3.5 text-base shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center`}>
            Explore Articles
          </NavLink>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-24 px-6 max-w-6xl mx-auto w-full flex-1"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
            className="bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#e8e8ed] transition-shadow duration-500 group cursor-pointer"
          >
            <div className="w-14 h-14 bg-[#0066cc]/10 rounded-2xl flex items-center justify-center mb-8 text-2xl group-hover:rotate-6 transition-transform duration-300">
              ✍️
            </div>
            <h3 className="text-xl font-bold text-[#1d1d1f] mb-3 tracking-tight">Publish Instantly</h3>
            <p className="text-[#6e6e73] leading-relaxed text-[0.95rem]">
              Write your thoughts and share them with the world in seconds. Our minimal editor makes publishing totally effortless.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
            className="bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#e8e8ed] transition-shadow duration-500 group cursor-pointer"
          >
            <div className="w-14 h-14 bg-[#34c759]/10 rounded-2xl flex items-center justify-center mb-8 text-2xl group-hover:rotate-6 transition-transform duration-300">
              🌟
            </div>
            <h3 className="text-xl font-bold text-[#1d1d1f] mb-3 tracking-tight">Discover Content</h3>
            <p className="text-[#6e6e73] leading-relaxed text-[0.95rem]">
              Read captivating articles across various topics. Find your niche and learn something incredibly new every single day.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
            className="bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#e8e8ed] transition-shadow duration-500 group cursor-pointer"
          >
            <div className="w-14 h-14 bg-[#ff9500]/10 rounded-2xl flex items-center justify-center mb-8 text-2xl group-hover:rotate-6 transition-transform duration-300">
              💬
            </div>
            <h3 className="text-xl font-bold text-[#1d1d1f] mb-3 tracking-tight">Engage & Discuss</h3>
            <p className="text-[#6e6e73] leading-relaxed text-[0.95rem]">
              Join the conversation. Leave comments, share your unique perspective, and seamlessly connect with other readers.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer / CTA */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="py-24 text-center bg-[#1d1d1f] text-white mt-auto"
      >
        <h2 className="text-4xl font-bold mb-6 tracking-tight">Ready to dive in?</h2>
        <p className="text-[#a1a1a6] mb-10 max-w-xl mx-auto text-lg">
          Create an account for free and get access to all features, including personalized recommendations and publishing tools.
        </p>
        <NavLink to="/register" className="inline-block bg-white text-[#1d1d1f] font-semibold px-10 py-4 rounded-full hover:bg-[#f5f5f7] hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
          Create Free Account
        </NavLink>
      </motion.section>
    </div>
  );
}

export default Home;