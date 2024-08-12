"use client";
import { BarChart, Compass, Layout, List, Plus, User2 } from "lucide-react";
import { usePathname } from "next/navigation";
import SidebarItem from "./sidebar-item";
const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
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
