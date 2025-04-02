
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Bell, User as UserIcon, Menu, X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <Button asChild>
              <h1>视频推荐平台</h1>
            </Button>
          </Link>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center w-full max-w-sm mx-8">
          <div className="relative w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索视频、用户..."
              className="pl-8 bg-secondary"
            />
          </div>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          {/* <Button asChild variant="outline">
            <Link to="/upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              上传视频
            </Link>
          </Button> */}

          {user ? (
            <>
              {/* <Button asChild variant="ghost" size="icon">
                <Link to="/notifications">
                  <Bell className="h-5 w-5" />
                </Link>
              </Button> */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt="用户头像" />
                      <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <h1>{user.username}</h1>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile">个人中心</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="text-destructive"
                  >
                    退出登录
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button asChild variant="outline">
                <Link to="/login">登录</Link>
              </Button>
              <Button asChild>
                <Link to="/register">注册</Link>
              </Button>
            </>
          )}
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-4">
            <div className="relative w-full">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索视频、用户..."
                className="pl-8 bg-secondary"
              />
            </div>
            <div className="flex flex-col space-y-3">
              <Button asChild className="w-full justify-start">
                <Link to="/upload" className="flex items-center">
                  <Upload className="mr-2 h-4 w-4" />
                  上传视频
                </Link>
              </Button>

              {user ? (
                <>
                  <Button asChild variant="ghost" className="justify-start">
                    <Link to="/profile" className="flex items-center">
                      <UserIcon className="mr-2 h-4 w-4" />
                      个人中心
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start text-destructive"
                    onClick={logout}
                  >
                    退出登录
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild className="w-full">
                    <Link to="/login">登录</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/register">注册</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
