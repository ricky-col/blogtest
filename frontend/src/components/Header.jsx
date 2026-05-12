import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../store/authStore";
import {
  navbarClass,
  navContainerClass,
  navBrandClass,
  navLinksClass,
  navLinkClass,
  navLinkActiveClass,
} from "../styles/common";

function Header() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.currentUser);
  const logout = useAuth((state) => state.logout);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // decide profile route based on role
  const getProfilePath = () => {
    if (!user) return "/";

    switch (user.role) {
      case "AUTHOR":
        return "/authordashboard";
      case "ADMIN":
        return "/admindashboard";
      default:
        return "/userdashboard";
    }
  };

  return (
    <nav className={navbarClass}>
      <div className={navContainerClass}>
        {/* Logo */}
        <NavLink to="/" className={navBrandClass}>
          Blog App
        </NavLink>

        <ul className={navLinksClass}>
          {/* Always visible */}
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}>
              Home
            </NavLink>
          </li>

          {/* Not logged in */}
          {!isAuthenticated && (
            <>
              <li>
                <NavLink to="/register" className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}>
                  Register
                </NavLink>
              </li>

              <li>
                <NavLink to="/login" className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}>
                  Login
                </NavLink>
              </li>
            </>
          )}

          {/* Logged in */}
          {isAuthenticated && (
            <>
              <li>
                <NavLink
                  to={getProfilePath() } state={user}
                  className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}
                >
                  {user?.profileImageUrl ? (
                    <div className="flex items-center gap-2">
                      <img src={user.profileImageUrl} alt="Profile" className="w-8 h-8 rounded-full object-cover border border-[#e8e8ed]" />
                      <span>Profile</span>
                    </div>
                  ) : (
                    "Profile"
                  )}
                </NavLink>
              </li>

              <li>
                <button className={navLinkClass} onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;