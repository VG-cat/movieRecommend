import { useEffect, useState } from "react";
import { VideoCard } from "@/components/video/VideoCard";
import { useAuth } from "@/contexts/AuthContext";
import { ProfileInfo } from "@/components/profile/ProfileInfo";
import { Layout } from "@/components/layout/Layout";
import { likedVideos, savedVideos, watchHistory } from "@/data/mockVideoData";

// 合并所有视频数据并去重
const getAllVideos = () => {
  // 创建一个 Map 用于去重
  const uniqueVideos = new Map();

  // 添加所有视频到 Map 中，使用 id 作为键以确保唯一性
  const allVideos = [...mockVideos, ...likedVideos, ...savedVideos, ...watchHistory];
  allVideos.forEach(video => {
    uniqueVideos.set(video.id, video);
  });

  // 将 Map 转换回数组
  return Array.from(uniqueVideos.values());
};

// Mock data for videos
const mockVideos = [
  {
    id: "1",
    title: "如何在30天内学会弹钢琴 - 初学者指南",
    thumbnail: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=2670&auto=format&fit=crop",
    views: 1250000,
    comments: 430,
    rating: 4.8,
    duration: "18:24",
    category: "音乐",
    createdAt: "3天前",
    creator: {
      id: "user1",
      name: "刘哥没烦恼",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
  },
  {
    id: "2",
    title: "2024年最佳科技产品评测 - 你不能错过的10款新品",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
    views: 843000,
    comments: 380,
    rating: 4.5,
    duration: "24:15",
    category: "科技",
    createdAt: "1周前",
    creator: {
      id: "user2",
      name: "科技最前沿",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
  },
  {
    id: "3",
    title: "日本东京旅游攻略 - 必去景点与美食推荐",
    thumbnail: "https://i0.hippopx.com/photos/574/398/392/beach-lagoon-sunset-sundown-thumb.jpg",
    views: 1870000,
    comments: 920,
    rating: 4.9,
    duration: "32:10",
    category: "旅行",
    createdAt: "2周前",
    creator: {
      id: "user3",
      name: "漫游宇宙",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
  },
  {
    id: "4",
    title: "超简单家常菜教程 - 20分钟搞定晚餐",
    thumbnail: "https://i0.hippopx.com/photos/516/241/158/salad-background-food-tasty-thumb.jpg",
    views: 730000,
    comments: 650,
    rating: 4.7,
    duration: "15:30",
    category: "美食",
    createdAt: "5天前",
    creator: {
      id: "user4",
      name: "美食家",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
  },
  {
    id: "5",
    title: "全球总决赛精彩瞬间回顾",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop",
    views: 467,
    comments: 33,
    rating: 4.9,
    duration: "28:45",
    category: "游戏",
    createdAt: "2天前",
    creator: {
      id: "user5",
      name: "解说master",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
  },
  {
    id: "6",
    title: "如何在家练出完美腹肌 - 30天挑战计划",
    thumbnail: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2670&auto=format&fit=crop",
    views: 9500,
    comments: 41,
    rating: 4.6,
    duration: "22:15",
    category: "健康",
    createdAt: "1周前",
    creator: {
      id: "user6",
      name: "健身教练",
      avatar: "https://i.pravatar.cc/150?img=6",
    },
  },
  {
    id: "7",
    title: "2025年最流行的10款手机游戏推荐",
    thumbnail: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=2670&auto=format&fit=crop",
    views: 110,
    comments: 23,
    rating: 4.4,
    duration: "19:50",
    category: "游戏",
    createdAt: "4天前",
    creator: {
      id: "user7",
      name: "游戏评测师",
      avatar: "https://i.pravatar.cc/150?img=7",
    },
  },
  {
    id: "8",
    title: "纽约时装周2023春夏系列亮点回顾",
    thumbnail: "https://files.toodaylab.com/2022/09/NYFWSS23_20220918104913_08.jpg",
    views: 70,
    comments: 50,
    rating: 4.8,
    duration: "27:30",
    category: "时尚",
    createdAt: "3周前",
    creator: {
      id: "user8",
      name: "灵感缪斯",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
  },
];



const Index = () => {
  const { user } = useAuth();
  const allVideos = getAllVideos();

  let recommendedVideos = []

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('http://192.168.116.1:3000/api/v1/video/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(async response => {
        // console.log(response.ok);d
        if (response.ok) {
          const data = await response.json();
          const formatDate = data.map(item => {
            return {
              ...item,
              thumbnail: item.cover,
              creator: item.user,
              createAt: item.createTime,
              id: item._id,
            }
          })
          recommendedVideos.concat(formatDate)
          recommendedVideos = recommendedVideos.sort(() => Math.random() - 0.5);
        }
        else {
          toast({
            title: "获取推荐失败",
            description: "请刷新页面获取",
            variant: "destructive",
          });

        }
      })
      .catch(error => console.error('Error:', error));
  }, [])

  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">全部视频</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recommendedVideos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
