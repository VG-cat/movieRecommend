
import { Link } from "react-router-dom";
import { Eye, MessageSquare, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  views: number;
  comments: number;
  rating: number;
  duration: string;
  category: string;
  createdAt: string;
  creator: {
    id: string;
    name: string;
    avatar: string;
  };
}

export const VideoCard = ({
  id,
  title,
  thumbnail,
  views,
  comments,
  rating,
  duration,
  category,
  createdAt,
  creator,
}: VideoCardProps) => {
  // Function to format view count
  const formatViews = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="group rounded-lg overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      <Link to={`/video/${id}`} className="block">
        <div className="relative aspect-video">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 right-0 m-2">
            <Badge variant="secondary" className="bg-black/70 text-white">
              {duration}
            </Badge>
          </div>
          <div className="absolute top-0 left-0 m-2">
            <Badge variant="outline" className="bg-primary/80 text-white border-none">
              {category}
            </Badge>
          </div>
        </div>
      </Link>

      <div className="p-3">
        <div className="flex space-x-3">
          {/* <Link to={`/profile/${creator.id}`}> */}
            <Avatar className="h-8 w-8">
              <AvatarImage src={creator.avatar} alt={creator.name} />
              <AvatarFallback>{creator.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
          {/* </Link> */}
          <div className="flex-1 min-w-0">
            {/* <Link to={`/video/${id}`} className="hover:text-primary transition-colors"> */}
              <h3 className="font-medium text-sm line-clamp-2 text-gray-800">{title}</h3>
            {/* </Link> */}
            <div className="flex items-center mt-1">
              {/* <Link to={`/profile/${creator.id}`} className="text-xs text-gray-600 hover:text-gray-900 transition-colors"> */}
                {creator.name}
              {/* </Link> */}
            </div>
            <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
              <div className="flex items-center">
                <Eye className="h-3 w-3 mr-1" />
                {formatViews(views)}
              </div>
              <div className="flex items-center">
                <MessageSquare className="h-3 w-3 mr-1" />
                {comments}
              </div>
              <div className="flex items-center">
                <Star className="h-3 w-3 mr-1 fill-yellow-500 text-yellow-500" />
                {rating.toFixed(1)}
              </div>
              <span>•</span>
              <span>{createdAt}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
