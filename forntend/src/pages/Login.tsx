
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
import { Mail, Lock, Loader } from "lucide-react";
import Layout from "@/components/layout/Layout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already logged in
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsSubmitting(true);
    const success = await login(email, password);
    setIsSubmitting(false);

    if (success) {
      navigate('/');
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="w-full max-w-md p-4">
          <Card className="border-border bg-card/60 backdrop-blur-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center font-bold">欢迎回来</CardTitle>
              <CardDescription className="text-center">
                登录您的账户以继续
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">密码</Label>
                    {/* <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                    忘记密码?
                  </Link> */}
                  </div>
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
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      登录中...
                    </>
                  ) : "登录"}
                </Button>
                <div className="text-center text-sm">
                  没有账户?{" "}
                  <Link to="/register" className="text-primary hover:underline">
                    注册新账户
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

export default Login;
