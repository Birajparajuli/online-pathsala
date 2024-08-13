"use client";
import {
  BarChart,
  Layout,
  List,
  ListIcon,
  Plus,
  Search,
  User2,
} from "lucide-react";
import { usePathname } from "next/navigation";
import SidebarItem from "./sidebar-item";
const guestRoutes = [
  {
    icon: ListIcon,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Search,
    label: "Searh",
    href: "/search",
  },
];

const teacherRoutes = [
  {
    icon: BarChart,
    label: "Dashboard",
    href: "/teacher/analytics",
  },
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },

  {
    icon: Plus,
    label: "Create course",
    href: "/teacher/create",
  },
];

const adminRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/admin/home",
  },
  {
    icon: User2,
    label: "All Users",
    href: "/admin/users",
  },
];

const SidebarRoutes = () => {
  const pathname = usePathname();
  // console.log(pathname);
  const isTeacherPage = pathname?.includes("/teacher");
  const isAdminPage = pathname?.includes("/admin");
  const routes = isTeacherPage
    ? teacherRoutes
    : isAdminPage
    ? adminRoutes
    : guestRoutes;
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
