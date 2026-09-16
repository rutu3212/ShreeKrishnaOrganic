import {
  BarChart3,
  Folder,
  Image,
  LayoutDashboard,
  LogOut,
  Package,
  Tag,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menu = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: Package,
    },
    {
      name: "Add Product",
      path: "/admin/products/add",
      icon: BarChart3,
    },
    {
      name: "Categories",
      path: "/admin/categories",
      icon: Folder,
    },
    {
      name: "Hero Images",
      path: "/admin/hero",
      icon: Image,
    },
    {
      name: "Offers",
      path: "/admin/offers",
      icon: Tag,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <aside className="hidden lg:flex w-64 min-h-screen bg-[#27301d] text-white fixed left-0 top-0 flex-col">
      <div className="p-7">
        <div className="font-serif text-2xl">
          Srikrishn
        </div>

        <div className="text-xs text-white/40 mt-1">
          Admin Panel
        </div>
      </div>

      <nav className="px-4 flex-1">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/65 hover:bg-white/10 hover:text-white transition mb-1"
            >
              <Icon size={18} />

              {item.name}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="m-4 flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}