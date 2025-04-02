
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { VideoPlayer } from "@/components/video/VideoPlayer";
import { CommentSection } from "@/components/video/CommentSection";
import { VideoRating } from "@/components/video/VideoRating";
import { VideoCard } from "@/components/video/VideoCard";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Heart,
  Share2,
  Bookmark,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Flag
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";

// Mock video data
// const videoData = {
//   id: "1",
//   title: "如何在30天内学会弹钢琴 - 初学者指南",
//   description: "这个视频将向你展示如何在短短30天内掌握钢琴基础。我们将从认识琴键开始，逐步学习基本的音阶、和弦以及简单的曲目。无论你是完全的音乐新手，还是有一些音乐基础，这个教程都能帮助你快速上手，建立良好的演奏习惯。",
//   videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4", // 演示链接
//   thumbnail: "http://192.168.116.1:3000/uploads/503.png",
//   views: 100,
//   likes: 40,
//   dislikes: 10,
//   shares: 850,
//   createdAt: "2024-11-10",
//   category: "音乐",
//   tags: ["钢琴", "音乐教程", "初学者", "乐器"],
//   creator: {
//     id: "user1",
//     name: "音乐大师",
//     avatar: "https://th.bing.com/th?id=OIP.UWhQzSTNEhMEL8Ub6WLF6AHaNK&w=187&h=333&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
//     followers: 10,
//     isFollowing: false,
//   },
// };

// Mock comments
// const mockComments = [
//   {
//     id: "c1",
//     userId: "user2",
//     userName: "钢琴爱好者",
//     userAvatar: "https://i.pravatar.cc/150?img=2",
//     content: "这个教程真的太有用了！之前一直想学钢琴但不知道从何开始，按照您的方法练习了两周，已经能弹简单的曲子了！",
//     createdAt: "3天前",
//     likes: 120,
//     dislikes: 3,
//     replies: [
//       {
//         id: "r1",
//         userId: "user1",
//         userName: "音乐大师",
//         userAvatar: "https://i.pravatar.cc/150?img=1",
//         content: "非常高兴能帮到你！坚持练习是关键，期待你分享更多学习成果！",
//         createdAt: "2天前",
//         likes: 45,
//         dislikes: 0,
//       }
//     ]
//   },
//   {
//     id: "c2",
//     userId: "user3",
//     userName: "音乐学院学生",
//     userAvatar: "https://i.pravatar.cc/150?img=3",
//     content: "作为一名音乐专业的学生，我认为这个教程对初学者来说非常全面，讲解方式也很清晰。特别喜欢您对指法的详细解析！",
//     createdAt: "1周前",
//     likes: 89,
//     dislikes: 2,
//   },
//   {
//     id: "c3",
//     userId: "user4",
//     userName: "古典乐迷",
//     userAvatar: "https://i.pravatar.cc/150?img=4",
//     content: "请问有没有针对古典音乐的进阶教程推荐？我已经掌握了基础，想尝试一些肖邦或莫扎特的作品。",
//     createdAt: "5天前",
//     likes: 37,
//     dislikes: 1,
//     replies: [
//       {
//         id: "r2",
//         userId: "user1",
//         userName: "音乐大师",
//         userAvatar: "https://i.pravatar.cc/150?img=1",
//         content: "下周我会发布一个肖邦夜曲的教程，可以关注我的频道获取最新消息！",
//         createdAt: "4天前",
//         likes: 28,
//         dislikes: 0,
//       }
//     ]
//   },
// ];


// Mock recommended videos (reusing the ones from Index.tsx)
// const recommendedVideos = [
//   {
//     id: "2",
//     title: "2025年没有什么能阻止人类搞和黑科技",
//     thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
//     views: 840,
//     comments: 38,
//     rating: 4.5,
//     duration: "24:15",
//     category: "科技",
//     createdAt: "1周前",
//     creator: {
//       id: "user2",
//       name: "科技最前沿",
//       avatar: "https://i.pravatar.cc/150?img=32",
//     },
//   },
//   {
//     id: "3",
//     title: "日本东京旅游攻略 - 必去景点与美食推荐",
//     thumbnail: "https://th.bing.com/th/id/OIP.Yxo6hE3bGP3UO33yRard5QHaE7?w=215&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
//     views: 1800,
//     comments: 53,
//     rating: 4.9,
//     duration: "32:10",
//     category: "旅行",
//     createdAt: "2周前",
//     creator: {
//       id: "user3",
//       name: "环球旅行家",
//       avatar: "https://i.pravatar.cc/150?img=89",
//     },
//   },
//   {
//     id: "5",
//     title: "全球总决赛精彩瞬间回顾",
//     thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop",
//     views: 250000,
//     comments: 180,
//     rating: 4.9,
//     duration: "28:45",
//     category: "游戏",
//     createdAt: "2天前",
//     creator: {
//       id: "user5",
//       name: "解说小圆",
//       avatar: "https://th.bing.com/th?id=OIP.mkfgRscyEaTHM0bYaV2mJAHaJ3&w=216&h=288&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
//     },
//   },
//   {
//     id: "4",
//     title: "超简单家常菜教程 - 20分钟搞定晚餐",
//     thumbnail: "https://i0.hippopx.com/photos/516/241/158/salad-background-food-tasty-thumb.jpg",
//     views: 730000,
//     comments: 650,
//     rating: 4.7,
//     duration: "15:30",
//     category: "美食",
//     createdAt: "5天前",
//     creator: {
//       id: "user4",
//       name: "美食家",
//       avatar: "https://i.pravatar.cc/140?img=23",
//     },
//   },
// ];

const VideoDetail = () => {
  const { id } = useParams();
  const [video, setVideo] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`http://192.168.116.1:3000/api/v1/video/getDetail/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(async response => {
        // console.log(response.ok);d
        if (response.ok) {
          const data = await response.json();
          setVideo({ 
            ...data, 
            id: data._id,
            thumbnail:data.cover,
            likes:data.likeCount,
            creatAt:data.createTime,
            creator:{...data.user,id:data.user._id,name:data.user.username,avatar:'http://192.168.116.1:3000/'+data.user.avatar}
          })
        }
        else {
          toast({
            title: "获取视频失败",
            description: "请刷新页面获取",
            variant: "destructive",
          });

        }
      })
      .catch(error => console.error('Error:', error));
  }, [id])
  let mockComments = []

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`http://192.168.116.1:3000/api/v1/video/getcommentlist/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      },
    })
      .then(async response => {
        // console.log(response.ok);d
        if (response.ok) {
          const data = await response.json();
          mockComments = data.list.map(item => {
            return { ...item, userId: item.user._id, userName: item.user.username, userAvatar: item.user.avatar, id: item._id, createAt: item.createTime }
          })
        }
        else {
          toast({
            title: "获取评论失败",
            description: "请刷新页面获取",
            variant: "destructive",
          });

        }
      })
      .catch(error => console.error('Error:', error));
  }, [id])

  let recommendedVideos = []

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('http://192.168.116.1:3000/api/v1/user/getrecvoid', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${user.token}`,
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
  }, [id])

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('http://192.168.116.1:3000/api/v1/video/hotlist', {
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
  }, [id])

  const handleFollow = () => {
    if(isFollowing){
      fetch(`http://192.168.116.1:3000/api/v1/user/unsubscribe?channelid=${video.creator._id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        },
      })
        .then(async response => {
          // console.log(response.ok);
          if (response.ok) {
            setIsFollowing(false);
          }
        })
        .catch(error => console.error('Error:', error));
    }else{
      fetch(`http://192.168.116.1:3000/api/v1/user/subscribe?channelid=${video.creator._id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        },
      })
        .then(async response => {
          // console.log(response.ok);
          if (response.ok) {
            setIsFollowing(true);
          }
        })
        .catch(error => console.error('Error:', error));
      
    }
    toast({
      title: isFollowing ? "已取消关注" : "已关注",
      description: isFollowing ? `已取消关注 ${video.creator.name}` : `已成功关注 ${video.creator.name}`,
    });
  };

  // const handleLike = () => {
  //   if (isDisliked) {
  //     setIsDisliked(false);
  //   }
  //   setIsLiked(!isLiked);

  //   toast({
  //     title: isLiked ? "已取消点赞" : "已点赞",
  //     description: "感谢您的反馈！",
  //   });
  // };

  // const handleDislike = () => {
  //   if (isLiked) {
  //     setIsLiked(false);
  //   }
  //   setIsDisliked(!isDisliked);

  //   toast({
  //     title: isDisliked ? "已取消点踩" : "已点踩",
  //     description: "感谢您的反馈！",
  //   });
  // };

  const handleSave = () => {
    fetch(`http://192.168.116.1:3000/api/v1/video/addcollect/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      },
    })
      .then(async response => {
        // console.log(response.ok);d
        if (response.ok) {
          const data = await response.json();
          setIsSaved(!isSaved);
        }
      })
      .catch(error => console.error('Error:', error));
    toast({
      title: isSaved ? "已从收藏中移除" : "已添加到收藏",
      description: "您可以在收藏夹中查看此视频。",
    });
  };

  // const handleShare = () => {
  //   // In a real app, this would open a share dialog
  //   toast({
  //     title: "分享链接已复制",
  //     description: "视频链接已复制到剪贴板。",
  //   });
  // };

  // const handleReport = () => {
  //   toast({
  //     title: "举报已提交",
  //     description: "我们已收到您的举报，并将尽快处理。",
  //   });
  // };

  const formatViewCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M 次观看`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K 次观看`;
    }
    return `${count} 次观看`;
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('zh-CN', options);
  };

  return (
    <Layout>
      <div className="container mx-auto pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <VideoPlayer
              videoUrl={video.videoUrl}
              posterUrl={video.thumbnail}
            />

            <div className="mt-4">
              <h1 className="text-2xl font-bold mb-2">{video.title}</h1>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="text-muted-foreground">
                  {formatViewCount(video.views)} • {formatDate(video.createdAt)}
                </span>

                <div className="flex items-center space-x-2 ml-auto">
                 {/*
                <Button
                  variant={isLiked ? "default" : "outline"}
                  size="sm"
                  onClick={handleLike}
                  className="space-x-1"
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>{video.likes + (isLiked ? 1 : 0)}</span>
                </Button>
                
                <Button
                  variant={isDisliked ? "default" : "outline"}
                  size="sm"
                  onClick={handleDislike}
                  className="space-x-1"
                >
                  <ThumbsDown className="h-4 w-4" />
                  <span>{video.dislikes + (isDisliked ? 1 : 0)}</span>
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="space-x-1"
                >
                  <Share2 className="h-4 w-4" />
                  <span>分享</span>
                </Button>
                
                <Button
                  variant={isSaved ? "default" : "outline"}
                  size="sm"
                  onClick={handleSave}
                >
                  <Bookmark className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReport}
                >
                  <Flag className="h-4 w-4" />
                </Button>*/}
                 <Button
                  variant={isSaved ? "default" : "outline"}
                  size="sm"
                  onClick={handleSave}
                ></Button>
              </div> 
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-secondary rounded-lg">
                <div className="flex items-center space-x-4">
                  <Link to={`/profile/${video.creator.id}`}>
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={video.creator.avatar} alt={video.creator.name} />
                      <AvatarFallback>{video.creator.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                  </Link>

                  <div>
                    <Link
                      to={`/profile/${video.creator.id}`}
                      className="font-medium hover:text-primary transition-colors"
                    >
                      {video.creator.name}
                    </Link>
                    <div className="text-sm text-muted-foreground">
                      {video.creator.followers.toLocaleString()} 位关注者
                    </div>
                  </div>
                </div>

                <Button
                  variant={isFollowing ? "secondary" : "default"}
                  onClick={handleFollow}
                  className="min-w-[100px]"
                >
                  {isFollowing ? (
                    <>
                      <Heart className="h-4 w-4 mr-2 fill-current" />
                      已关注
                    </>
                  ) : (
                    <>
                      <Heart className="h-4 w-4 mr-2" />
                      关注
                    </>
                  )}
                </Button>
              </div>

              <div className="mt-6 p-4 bg-card rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">视频介绍</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{video.category}</Badge>
                    {video.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>
                <p className="text-sm whitespace-pre-line">{video.description}</p>
              </div>

              <div className="mt-6 p-4 bg-card rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">为这个视频评分</h3>
                  <div className="text-sm text-muted-foreground">
                    您的评分将帮助其他用户
                  </div>
                </div>
                <VideoRating />
              </div>

              <CommentSection
                videoId={video.id}
                comments={mockComments}
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <h3 className="font-semibold mb-4">推荐视频</h3>
            <div className="space-y-4">
              {recommendedVideos.map((video) => (
                <VideoCard key={video.id} {...video} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VideoDetail;
