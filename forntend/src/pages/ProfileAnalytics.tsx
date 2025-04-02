
import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { ProfileInfo } from "@/components/profile/ProfileInfo";
import { VideoCard } from "@/components/video/VideoCard";
import EngagementChart from "@/components/analytics/EngagementChart";
import InterestsWordCloud from "@/components/analytics/InterestsWordCloud";
import ActivityStats from "@/components/analytics/ActivityStats";
import { likedVideos, savedVideos, watchHistory } from "@/data/mockVideoData";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ProfileAnalytics = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [likedVideos, setlikedVideos] = useState([]);
  const [savedVideos, setsavedVideos] = useState([]);
  const [watchHistory, setwatchHistory] = useState([]);
  const { toast } = useToast();






  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`http://192.168.116.1:3000/api/v1/video/likelist`, {
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
          setlikedVideos({
            ...data,
            id: data._id,
            thumbnail: data.cover,
            likes: data.likeCount,
            creatAt: data.createTime,
            creator: { ...data.user, id: data.user._id, name: data.user.username, avatar: 'http://192.168.116.1:3000/' + data.user.avatar }
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
  }, [])
  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`http://192.168.116.1:3000/api/v1/video/collectlist`, {
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
          setsavedVideos({
            ...data,
            id: data._id,
            thumbnail: data.cover,
            likes: data.likeCount,
            creatAt: data.createTime,
            creator: { ...data.user, id: data.user._id, name: data.user.username, avatar: 'http://192.168.116.1:3000/' + data.user.avatar }
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
  }, [])
  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`http://192.168.116.1:3000/api/v1/video/watchlist`, {
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
          setwatchHistory({
            ...data,
            id: data._id,
            thumbnail: data.cover,
            likes: data.likeCount,
            creatAt: data.createTime,
            creator: { ...data.user, id: data.user._id, name: data.user.username, avatar: 'http://192.168.116.1:3000/' + data.user.avatar }
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
  }, [])

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">请先登录</h1>
          <p className="mb-6">您需要登录才能查看个人信息</p>
          <Button onClick={() => navigate("/login")}>
            前往登录
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <Tabs defaultValue="profile" onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">个人中心</h1>
            <TabsList>
              <TabsTrigger value="profile">个人主页</TabsTrigger>
              <TabsTrigger value="analytics">数据分析</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="profile">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 用户信息卡片 */}
              <div className="md:col-span-1">
                <ProfileInfo user={user} />
              </div>

              {/* 视频内容部分 */}
              <div className="md:col-span-2">
                <Tabs defaultValue="liked">
                  <TabsList className="w-full mb-4">
                    <TabsTrigger value="liked" className="flex-1">我的点赞</TabsTrigger>
                    <TabsTrigger value="saved" className="flex-1">我的收藏</TabsTrigger>
                    <TabsTrigger value="history" className="flex-1">观看历史</TabsTrigger>
                  </TabsList>

                  <TabsContent value="liked">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {likedVideos.length > 0 ? (
                        likedVideos.map((video) => (
                          <VideoCard key={video.id} {...video} />
                        ))
                      ) : (
                        <p className="col-span-2 text-center text-gray-500 py-12">暂无点赞视频</p>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="saved">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {savedVideos.length > 0 ? (
                        savedVideos.map((video) => (
                          <VideoCard key={video.id} {...video} />
                        ))
                      ) : (
                        <p className="col-span-2 text-center text-gray-500 py-12">暂无收藏视频</p>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="history">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {watchHistory.length > 0 ? (
                        watchHistory.map((video) => (
                          <VideoCard key={video.id} {...video} />
                        ))
                      ) : (
                        <p className="col-span-2 text-center text-gray-500 py-12">暂无观看历史</p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>用户参与度</CardTitle>
                </CardHeader>
                <CardContent>
                  <EngagementChart />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>活动统计</CardTitle>
                </CardHeader>
                <CardContent>
                  <ActivityStats />
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>兴趣词云</CardTitle>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <InterestsWordCloud />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ProfileAnalytics;
