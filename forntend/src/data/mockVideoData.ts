
// Mock video data for profile page
export interface Creator {
  id: string;
  name: string;
  avatar: string;
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  views: number;
  comments: number;
  rating: number;
  duration: string;
  category: string;
  createdAt: string;
  creator: Creator;
}

export const likedVideos: Video[] = [
  {
    id: "1",
    title: "小白如何快速学习python",
    thumbnail: "https://picsum.photos/seed/video1/640/360",
    views: 120,
    comments: 8,
    rating: 4.8,
    duration: "10:45",
    category: "教育",
    createdAt: "3天前",
    creator: {
      id: "1",
      name: "老王带你学python",
      avatar: "https://192.168.116.1:3000/uploads/9e978d8c13ce83942dfc20cf9bcf9e17.jpg",
    },
  },
  {
    id: "2",
    title: "2025年最值得学习的技术趋势",
    thumbnail: "http://192.168.116.1:3000/uploads/233.png",
    views: 87,
    comments: 5,
    rating: 4.5,
    duration: "15:20",
    category: "科技",
    createdAt: "1周前",
    creator: {
      id: "2",
      name: "探索者",
      avatar: "http://192.168.116.1:3000/uploads/9e978d8c13ce83942dfc20cf9bcf9e17.jpg",
    },
  },
];

export const savedVideos: Video[] = [
  {
    id: "3",
    title: "高效能人士的 13 项时间管理技巧",
    thumbnail: "https://img.36krcdn.com/20201006/v2_7a7ec59882854e3bbf21e526b529a5a7_img_jpg?x-oss-process=image/format,jpg/interlace,1",
    views: 15,
    comments: 12,
    rating: 4.9,
    duration: "12:30",
    category: "自我提升",
    createdAt: "2周前",
    creator: {
      id: "3",
      name: "小番茄",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=master",
    },
  },
];

export const watchHistory: Video[] = [
  {
    id: "4",
    title: "健康饮食与营养知识全攻略",
    thumbnail: "https://p2.itc.cn/q_70/images03/20210728/ccb1c4f06acf40098cdc38b64fd625f2.png",
    views: 70,
    comments: 5,
    rating: 4.3,
    duration: "18:15",
    category: "健康",
    createdAt: "3天前",
    creator: {
      id: "4",
      name: "健康达人",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=health",
    },
  },
  {
    id: "5",
    title: "初学者摄影技巧与后期处理",
    thumbnail: "https://picsum.photos/seed/video5/640/360",
    views: 90,
    comments: 7,
    rating: 4.6,
    duration: "22:40",
    category: "艺术",
    createdAt: "5天前",
    creator: {
      id: "5",
      name: "Romack",
      avatar: "http://pi.dicebear.com/7.x/avataaars/svg?seed=jack",
    },
  },
];
