import React from 'react';
import { NavLink } from 'react-router';
import { pageBackground, primaryBtn, secondaryBtn } from '../styles/common';

function Home() {
  return (
    <div className={`${pageBackground} flex flex-col min-h-[calc(100vh-52px)]`}>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24 md:py-32 bg-gradient-to-b from-white to-[#f5f5f7]">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-[#0066cc]/10 text-[#0066cc] text-[0.7rem] font-bold tracking-widest uppercase shadow-sm">
          Welcome to the Future of Publishing
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-[#1d1d1f] tracking-tight max-w-4xl leading-[1.1] mb-6">
          Ideas that <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066cc] to-[#3385ff]">ignite</span> the world.
        </h1>
        <p className="text-lg md:text-xl text-[#6e6e73] max-w-2xl mb-10 leading-relaxed font-medium">
          Discover incredible stories, insights, and ideas from passionate writers around the globe. Join our community and start your journey today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <NavLink to="/register" className={`${primaryBtn} px-8 py-3.5 text-base shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center`}>
            Start Writing
          </NavLink>
          <NavLink to="/login" className={`${secondaryBtn} bg-white px-8 py-3.5 text-base shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center`}>
            Explore Articles
          </NavLink>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto w-full flex-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#e8e8ed] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 group cursor-pointer">
            <div className="w-14 h-14 bg-[#0066cc]/10 rounded-2xl flex items-center justify-center mb-8 text-2xl group-hover:scale-110 transition-transform duration-300">
              ✍️
            </div>
            <h3 className="text-xl font-bold text-[#1d1d1f] mb-3 tracking-tight">Publish Instantly</h3>
            <p className="text-[#6e6e73] leading-relaxed text-[0.95rem]">
              Write your thoughts and share them with the world in seconds. Our minimal editor makes publishing totally effortless.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#e8e8ed] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 group cursor-pointer">
            <div className="w-14 h-14 bg-[#34c759]/10 rounded-2xl flex items-center justify-center mb-8 text-2xl group-hover:scale-110 transition-transform duration-300">
              🌟
            </div>
            <h3 className="text-xl font-bold text-[#1d1d1f] mb-3 tracking-tight">Discover Content</h3>
            <p className="text-[#6e6e73] leading-relaxed text-[0.95rem]">
              Read captivating articles across various topics. Find your niche and learn something incredibly new every single day.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#e8e8ed] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 group cursor-pointer">
            <div className="w-14 h-14 bg-[#ff9500]/10 rounded-2xl flex items-center justify-center mb-8 text-2xl group-hover:scale-110 transition-transform duration-300">
              💬
            </div>
            <h3 className="text-xl font-bold text-[#1d1d1f] mb-3 tracking-tight">Engage & Discuss</h3>
            <p className="text-[#6e6e73] leading-relaxed text-[0.95rem]">
              Join the conversation. Leave comments, share your unique perspective, and seamlessly connect with other readers.
            </p>
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <section className="py-24 text-center bg-[#1d1d1f] text-white mt-auto">
        <h2 className="text-4xl font-bold mb-6 tracking-tight">Ready to dive in?</h2>
        <p className="text-[#a1a1a6] mb-10 max-w-xl mx-auto text-lg">
          Create an account for free and get access to all features, including personalized recommendations and publishing tools.
        </p>
        <NavLink to="/register" className="bg-white text-[#1d1d1f] font-semibold px-10 py-4 rounded-full hover:bg-[#f5f5f7] hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
          Create Free Account
        </NavLink>
      </section>
    </div>
  );
}

export default Home;