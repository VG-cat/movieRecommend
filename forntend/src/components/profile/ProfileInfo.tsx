
import React from "react";
import {  User } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Bookmark, ThumbsUp, Eye } from "lucide-react";

// User stats data
const userStats = [
  { label: "观看记录", value: "12", icon: Eye, color: "text-blue-500", bgColor: "bg-blue-50" },
  { label: "点赞视频", value: "2", icon: ThumbsUp, color: "text-green-500", bgColor: "bg-green-50" },
  { label: "收藏视频", value: "5", icon: Bookmark, color: "text-purple-500", bgColor: "bg-purple-50" },
  { label: "关注创作者", value: "8", icon: Heart, color: "text-red-500", bgColor: "bg-red-50" },
];

interface ProfileInfoProps {
  user: User;
}



export const ProfileInfo = ({ user }: ProfileInfoProps) => {
  return (
    <Card className="md:col-span-1">
      <CardHeader className="flex flex-col items-center">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src={user.avatar} alt={user.username} />
          <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-2xl">{user.username}</CardTitle>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="text-sm text-muted-foreground">
            <p>账号创建于 2025年1月</p>
            <p className="mt-1">最近活跃：今天</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6">
            {userStats.map((stat) => (
              <div key={stat.label} className={`flex flex-col items-center p-3 ${stat.bgColor} rounded-lg`}>
                <stat.icon className={`h-5 w-5 ${stat.color} mb-1`} />
                <p className="text-lg font-semibold">{stat.value}</p>
                <p className="text-xs text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">兴趣标签</h3>
            <div className="flex flex-wrap gap-2">
              <Badge>编程</Badge>
              <Badge>设计</Badge>
              <Badge>科技</Badge>
              <Badge>自我提升</Badge>
              <Badge>音乐</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileInfo;
