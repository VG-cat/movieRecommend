
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/layout/Layout";
import { ProfileInfo } from "@/components/profile/ProfileInfo";
import { ProfileActivityTabs } from "@/components/profile/ProfileActivityTabs";
import { likedVideos, savedVideos, watchHistory } from "@/data/mockVideoData";
import { useToast } from "@/hooks/use-toast";

const UserProfile = () => {
  const { user } = useAuth();
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
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-lg">请先登录查看个人信息</p>
        </div>
      </Layout>
    );
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Info Card */}
          <ProfileInfo user={user} />

          {/* Activity Tabs */}
          <div className="md:col-span-2">
            <ProfileActivityTabs
              likedVideos={likedVideos}
              savedVideos={savedVideos}
              watchHistory={watchHistory}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
