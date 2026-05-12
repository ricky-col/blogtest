import { NavLink, Outlet } from "react-router";
import { pageWrapper, navLinksClass, navLinkClass, navLinkActiveClass, divider } from "../styles/common";
import { useAuth } from "../store/authStore";

function AuthorDashboard() {
  const user = useAuth((state) => state.currentUser);

  return (
    <div className={pageWrapper}>
      {/* Profile Header */}
      <div className='flex justify-end items-center gap-4 mb-8'>
        <p className='text-2xl font-bold text-[#1d1d1f]'>Welcome, {user?.firstName}</p>
        {user?.profileImageUrl ? (
          <img src={user.profileImageUrl} alt="Profile Pic" className='rounded-full w-20 h-20 object-cover shadow-sm'/>
        ) : (
          <div className='rounded-full w-20 h-20 bg-gray-200 flex items-center justify-center text-gray-500 shadow-sm'>No Pic</div>
        )}
      </div>

      {/* Author Navigation */}
      <div className="flex gap-6 mb-6">
        <NavLink to="articles" className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}>
          Articles
        </NavLink>

        <NavLink to="addArticle" className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}>
          Write Article
        </NavLink>
      </div>

      <div className={divider}></div>

      {/* Nested route content */}
      <Outlet />
    </div>
  );
}

export default AuthorDashboard;