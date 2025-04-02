
import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartData {
  name: string;
  [key: string]: string | number;
}

interface BarChartProps {
  title: string;
  data: ChartData[];
  dataKeys: Array<{
    key: string;
    color: string;
    name: string;
  }>;
  layout?: 'vertical' | 'horizontal';
}

export const BarChart = ({
  title,
  data,
  dataKeys,
  layout = 'horizontal',
}: BarChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={data}
              layout={layout}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey={layout === 'horizontal' ? 'name' : undefined}
                type={layout === 'horizontal' ? 'category' : 'number'}
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                dataKey={layout === 'vertical' ? 'name' : undefined}
                type={layout === 'vertical' ? 'category' : 'number'}
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={layout === 'horizontal' ? (value) => `${value}` : undefined}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))'
                }}
              />
              <Legend />
              {dataKeys.map((dataKey) => (
                <Bar
                  key={dataKey.key}
                  dataKey={dataKey.key}
                  fill={dataKey.color}
                  name={dataKey.name}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
