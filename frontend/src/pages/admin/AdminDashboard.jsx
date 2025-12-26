import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const linkBase = "block px-3 py-2 rounded hover:bg-gray-300 transition";
const linkActive = "bg-blue-600 text-white hover:bg-blue-700";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-56 bg-gray-200 min-h-screen p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">Admin Panel</h2>
          <button
            onClick={logout}
            className="text-xs px-2 py-1 border rounded hover:bg-gray-300"
          >
            Logout
          </button>
        </div>

        <nav>
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/admin-dash"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : ""}`
                }
                end
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin-dash/pending"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : ""}`
                }
                end
              >
                Pending Flats
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin-dash/approved"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : ""}`
                }
                end
              >
                Approved Flats
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin-dash/sold"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : ""}`
                }
                end
              >
                 Sold Flats
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin-dash/enquiriesAll"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : ""}`
                }
                end
              >
                 All Enquiries
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      
      <main className="flex-1 p-4">
        <Outlet/>
      </main>
    </div>
  );
};

export default AdminDashboard;
