
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { VideoCard } from "@/components/video/VideoCard";
import { ThumbsUp, Bookmark, History } from "lucide-react";

// Types for video data
interface Creator {
  id: string;
  name: string;
  avatar: string;
}

interface Video {
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

interface ProfileActivityTabsProps {
  likedVideos: Video[];
  savedVideos: Video[];
  watchHistory: Video[];
}

export const ProfileActivityTabs = ({ likedVideos, savedVideos, watchHistory }: ProfileActivityTabsProps) => {
  return (
    <Tabs defaultValue="liked" className="w-full">
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="liked" className="flex items-center gap-1">
          <ThumbsUp className="h-4 w-4" />
          <span>点赞视频</span>
        </TabsTrigger>
        <TabsTrigger value="saved" className="flex items-center gap-1">
          <Bookmark className="h-4 w-4" />
          <span>收藏视频</span>
        </TabsTrigger>
        <TabsTrigger value="history" className="flex items-center gap-1">
          <History className="h-4 w-4" />
          <span>观看记录</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="liked">
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {likedVideos.map((video) => (
              <VideoCard key={video.id} {...video} />
            ))}
          </div>
        </ScrollArea>
      </TabsContent>

      <TabsContent value="saved">
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {savedVideos.map((video) => (
              <VideoCard key={video.id} {...video} />
            ))}
          </div>
        </ScrollArea>
      </TabsContent>

      <TabsContent value="history">
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {watchHistory.map((video) => (
              <VideoCard key={video.id} {...video} />
            ))}
          </div>
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
};

export default ProfileActivityTabs;
