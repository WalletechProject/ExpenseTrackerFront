import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  TrendingDown,
  TrendingUp,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

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

        {/* Navigation */}
        <nav className="mt-6">
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
