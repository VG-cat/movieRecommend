
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demo purposes
const MOCK_USERS = [
  {
    id: '1',
    username: '秋野',
    email: 'aish@163.com',
    password: '12345678',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo'
  },
  {
    id: '2',
    username: 'user',
    email: 'user@example.com',
    password: 'password',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for saved user in localStorage on initial load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // Simulate API call with timeout
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find user with matching email and password
    // const matchedUser = MOCK_USERS.find(
    //   u => u.email === email && u.password === password
    // );

    let matchedUser = undefined

    await fetch('http://192.168.116.1:3000/api/v1/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    })
      .then(async response => {
        // console.log(response.ok);d
        if(response.ok){
          const data = await response.json();
          matchedUser = {...data,avatar:'http://192.168.116.1:3000/'+data.avatar,id:data._id}
        }
        console.log(matchedUser);
        
      })
      .catch(error => console.error('Error:', error));

    if (matchedUser) {
      const { password, ...userWithoutPassword } = matchedUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      toast({
        title: "登录成功",
        description: `欢迎回来，${userWithoutPassword.username}！`,
      });
      setIsLoading(false);
      return true;
    } else {
      toast({
        title: "登录失败",
        description: "邮箱或密码错误",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // Simulate API call with timeout
    await new Promise(resolve => setTimeout(resolve, 1000));

    let matchedUser = undefined

    await fetch('http://192.168.116.1:3000/api/v1/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
        "username": username,
      })
    })
      .then(async response => {
        // console.log(response.ok);d
        if(response.ok){
          const data = await response.json();
          matchedUser = {...data,avatar:'http://192.168.116.1:3000/'+data.avatar,id:data._id}
        }
        else{
          toast({
            title: "注册失败",
            description: "该邮箱已被注册",
            variant: "destructive",
          });
          setIsLoading(false);
        }
        // console.log(matchedUser);
        
      })
      .catch(error => console.error('Error:', error));

    if (matchedUser) {
      const { password, ...userWithoutPassword } = matchedUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      toast({
        title: "注册成功",
        description: "请使用新账号登录",
      });
      setIsLoading(false);
      return true;
    } else {
      toast({
        title: "注册失败",
        description: "该邮箱已被注册",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "已退出登录",
    });
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
