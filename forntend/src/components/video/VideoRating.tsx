
import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface VideoRatingProps {
  initialRating?: number;
  onRatingChange?: (rating: number) => void;
}

export const VideoRating = ({
  initialRating = 0,
  onRatingChange,
}: VideoRatingProps) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  const { toast } = useToast();

  const handleRatingClick = async (newRating: number) => {
    setRating(newRating);
    
    if (onRatingChange) {
      onRatingChange(newRating);
    }

    await fetch(`http://192.168.116.1:3000/api/v1/video/like/${videoId}?rate=${newRating}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      }
    })
      .then(async response => {
        // console.log(response.ok);d
        if(response.ok){
          const data = await response.json();
          toast({
            title: "评分已提交",
            description: `您给了 ${newRating} 星评价`,
          });
        }
        else{
          toast({
            title: "评分失败",
            description: "请您重新评分",
            variant: "destructive",
          });
        }
        // console.log(matchedUser);
        
      })
      .catch(error => console.error('Error:', error));
  };

  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center space-x-1">
      {stars.map((star) => (
        <Button
          key={star}
          variant="ghost"
          size="sm"
          className="p-0 h-auto hover:bg-transparent"
          onClick={() => handleRatingClick(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
        >
          <Star
            className={cn(
              "h-6 w-6",
              (hoverRating || rating) >= star
                ? "fill-yellow-500 text-yellow-500"
                : "text-muted-foreground"
            )}
          />
        </Button>
      ))}
      <span className="text-sm font-medium ml-2">
        {rating > 0 ? `${rating}/5` : "未评分"}
      </span>
    </div>
  );
};
