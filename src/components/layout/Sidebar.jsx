import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  TrendingDown,
  TrendingUp,
  Menu,
  X,
  User,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout, loadUserProfile } = useAuth();

  const menuItems = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: LayoutDashboard,
      color: "text-blue-500",
    },
    {
      path: "/expenses",
      name: "Expenses",
      icon: TrendingDown,
      color: "text-red-500",
    },
    {
      path: "/income",
      name: "Income",
      icon: TrendingUp,
      color: "text-green-500",
    },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const handleLogout = () => {
    logout();
  };

  const handleProfileRefresh = async () => {
    try {
      await loadUserProfile();
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error("Error refreshing profile:", error);
    }
  };

  // Fermer le dropdown quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest(".user-menu-container")) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button onClick={toggleSidebar} className="btn btn-square btn-primary">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-full bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:shadow-none
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        w-64
      `}
      >
        {/* Logo/Brand */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">ExpenseTracker</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your finances</p>
        </div>

        {/* User Profile Section */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative user-menu-container">
            <button
              onClick={toggleUserMenu}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900 text-sm">
                    {user?.username || user?.email || "Utilisateur"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
              </div>
              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform duration-200 ${
                  isUserMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="py-2">
                  <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                    <Settings size={16} className="mr-3 text-gray-400" />
                    Paramètres
                  </button>
                  <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                    <User size={16} className="mr-3 text-gray-400" />
                    Profil
                  </button>
                  <button
                    onClick={handleProfileRefresh}
                    className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <User size={16} className="mr-3 text-gray-400" />
                    Rafraîchir le profil
                  </button>
                  <hr className="my-2 border-gray-200" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} className="mr-3" />
                    Se déconnecter
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 flex-1">
          <ul className="space-y-2 px-4">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-lg transition-all duration-200 group
                      ${
                        isActive
                          ? "bg-primary text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                      }`
                    }
                  >
                    <IconComponent
                      size={20}
                      className={`mr-3 transition-colors duration-200 group-hover:${item.color}`}
                    />
                    <span className="font-medium">{item.name}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-4 text-white">
            <h3 className="font-semibold text-sm">Pro Tip</h3>
            <p className="text-xs mt-1 opacity-90">
              Track your expenses daily for better financial control
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
