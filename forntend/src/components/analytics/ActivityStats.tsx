
import { ChartBar, MessageSquare, ThumbsUp, Eye } from "lucide-react";

const stats = [
  { 
    label: "观看总数", 
    value: "1,32", 
    icon: Eye,
    color: "text-blue-500",
    bgColor: "bg-blue-50" 
  },
  { 
    label: "评论数", 
    value: "15", 
    icon: MessageSquare,
    color: "text-green-500",
    bgColor: "bg-green-50" 
  },
  { 
    label: "获赞数", 
    value: "32", 
    icon: ThumbsUp,
    color: "text-purple-500",
    bgColor: "bg-purple-50" 
  },
  { 
    label: "平均观看时长", 
    value: "5.2分钟", 
    icon: ChartBar,
    color: "text-orange-500",
    bgColor: "bg-orange-50" 
  },
];

const ActivityStats = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className={`flex items-center p-4 ${stat.bgColor} rounded-lg shadow-sm border border-gray-100`}>
          <stat.icon className={`h-8 w-8 ${stat.color}`} />
          <div className="ml-4">
            <p className="text-sm text-gray-600">{stat.label}</p>
            <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityStats;
