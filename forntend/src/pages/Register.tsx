
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Lock, User, Loader } from "lucide-react";
import Layout from "@/components/layout/Layout";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already logged in
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setPasswordError("两次输入的密码不一致");
      return false;
    }
    if (password.length < 6) {
      setPasswordError("密码长度至少为6个字符");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePassword()) return;

    setIsSubmitting(true);
    const success = await register(username, email, password);
    setIsSubmitting(false);

    if (success) {
      navigate('/login');
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="w-full max-w-md p-4">
          <Card className="border-border bg-card/60 backdrop-blur-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center font-bold">创建新账户</CardTitle>
              <CardDescription className="text-center">
                注册一个新账户开始您的视频之旅
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">用户名</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="username"
                      placeholder="您的用户名"
                      className="pl-10"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">邮箱</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="您的邮箱"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">密码</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">确认密码</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  {passwordError && (
                    <p className="text-sm text-destructive">{passwordError}</p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      注册中...
                    </>
                  ) : "注册账户"}
                </Button>
                <div className="text-center text-sm">
                  已有账户?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    登录
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
