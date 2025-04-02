
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '周一', 观看: 30, 评论: 2 },
  { name: '周二', 观看: 2, 评论: 0 },
  { name: '周三', 观看: 10, 评论: 6 },
  { name: '周四', 观看: 30, 评论: 1 },
  { name: '周五', 观看: 20, 评论: 0 },
  { name: '周六', 观看: 5, 评论: 1 },
  { name: '周日', 观看: 35, 评论: 5 },
];

const EngagementChart = () => {
  return (
    <div className="h-[300px] w-full bg-white rounded-lg p-4 shadow-sm">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #f0f0f0', 
              borderRadius: '8px'
            }} 
          />
          <Line 
            type="monotone" 
            dataKey="观看" 
            stroke="#8B5CF6" 
            strokeWidth={2}
            dot={{ fill: '#8B5CF6', strokeWidth: 2 }}
            activeDot={{ r: 6 }} 
          />
          <Line 
            type="monotone" 
            dataKey="评论" 
            stroke="#10B981" 
            strokeWidth={2}
            dot={{ fill: '#10B981', strokeWidth: 2 }}
            activeDot={{ r: 6 }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EngagementChart;
