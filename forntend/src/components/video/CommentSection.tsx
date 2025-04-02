
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, ThumbsDown, Reply } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
  likes: number;
  dislikes: number;
  replies?: Comment[];
}

interface CommentSectionProps {
  videoId: string;
  comments: Comment[];
}


export const CommentSection = ({ videoId, comments }: CommentSectionProps) => {
  const [commentText, setCommentText] = useState("");
  const [allComments, setAllComments] = useState<Comment[]>(comments);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmitComment = async () => {
    if (!commentText.trim()) return;
    let newComment = undefined
    await fetch(`http://192.168.116.1:3000/api/v1/video/addcomment/${videoId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        "user":"user.id",
        "content":"commentText",
      })
    })
      .then(async response => {
        // console.log(response.ok);d
        if(response.ok){
          const data = await response.json();
          newComment = {
            id: `comment-${Date.now()}`,
            userId: user.id,
            userName: user.username,
            userAvatar:user.avatar,
            content: commentText,
            createdAt: "刚刚",
            likes: 0,
            dislikes: 0,
          };
        }
        else{
          toast({
            title: "评论未发布",
            description: "请您重新发布",
            variant: "destructive",
          });
        }
        // console.log(matchedUser);
        
      })
      .catch(error => console.error('Error:', error));

    setAllComments([newComment, ...allComments]);
    setCommentText("");
    
    toast({
      title: "评论已发布",
      description: "感谢您的参与！",
    });
  };

  const handleLike = (commentId: string) => {
    setAllComments(
      allComments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, likes: comment.likes + 1 };
        }
        return comment;
      })
    );
  };

  const handleDislike = (commentId: string) => {
    setAllComments(
      allComments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, dislikes: comment.dislikes + 1 };
        }
        return comment;
      })
    );
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">评论 ({allComments.length})</h3>
      
      <div className="mb-6">
        <div className="flex space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar} alt="Current User" />
            <AvatarFallback>CU</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="添加一条评论..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="min-h-[80px] resize-none"
            />
            <div className="mt-2 flex justify-end">
              <Button onClick={handleSubmitComment}>发布</Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        {allComments.map((comment) => (
          <div key={comment.id} className="flex space-x-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={comment.userAvatar} alt={comment.userName} />
              <AvatarFallback>{comment.userName.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium">{comment.userName}</span>
                <span className="text-xs text-muted-foreground">{comment.createdAt}</span>
              </div>
              <p className="text-sm mb-2">{comment.content}</p>
              {/* <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs h-7 px-2"
                  onClick={() => handleLike(comment.id)}
                >
                  <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                  {comment.likes}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs h-7 px-2"
                  onClick={() => handleDislike(comment.id)}
                >
                  <ThumbsDown className="h-3.5 w-3.5 mr-1" />
                  {comment.dislikes}
                </Button>
                <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
                  <Reply className="h-3.5 w-3.5 mr-1" />
                  回复
                </Button>
              </div>
              
              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-4 space-y-4 pl-6 border-l border-border">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={reply.userAvatar} alt={reply.userName} />
                        <AvatarFallback>{reply.userName.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-sm">{reply.userName}</span>
                          <span className="text-xs text-muted-foreground">{reply.createdAt}</span>
                        </div>
                        <p className="text-sm mb-2">{reply.content}</p>
                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            {reply.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                            <ThumbsDown className="h-3 w-3 mr-1" />
                            {reply.dislikes}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
