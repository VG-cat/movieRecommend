
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home, 
  UploadIcon,
  User,
  Video
} from "lucide-react";

type SidebarItem = {
  title: string;
  icon: any;
  href: string;
  indentLevel?: number;
};

const sidebarItems: SidebarItem[] = [
  {
    title: "首页",
    icon: Home,
    href: "/",
  },
  {
    title: "上传视频",
    icon: UploadIcon,
    href: "/upload",
  },
  {
    title: "个人中心",
    icon: User,
    href: "/profile",
  }
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="hidden md:block w-64 h-[calc(100vh-4rem)] bg-sidebar overflow-y-auto sticky top-16 pb-10">
      <div className="py-4 h-full">
        <nav className="space-y-1 px-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                item.href === location.pathname
                  ? "bg-sidebar-accent text-primary font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
                item.indentLevel ? `pl-${item.indentLevel * 4}` : ""
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};
