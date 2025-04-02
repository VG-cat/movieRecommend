
import { ResponsiveContainer, LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartData {
  name: string;
  [key: string]: string | number;
}

interface LineChartProps {
  title: string;
  data: ChartData[];
  dataKeys: Array<{
    key: string;
    color: string;
    name: string;
  }>;
  gridAxis?: 'x' | 'y' | 'both' | 'none';
}

export const LineChart = ({
  title,
  data,
  dataKeys,
  gridAxis = 'both',
}: LineChartProps) => {
  // Determine which grid lines to show
  const showHorizontal = gridAxis === 'y' || gridAxis === 'both';
  const showVertical = gridAxis === 'x' || gridAxis === 'both';

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={showHorizontal} vertical={showVertical} />
              <XAxis 
                dataKey="name" 
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))'
                }}
              />
              <Legend />
              {dataKeys.map((dataKey) => (
                <Line
                  key={dataKey.key}
                  type="monotone"
                  dataKey={dataKey.key}
                  stroke={dataKey.color}
                  name={dataKey.name}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
