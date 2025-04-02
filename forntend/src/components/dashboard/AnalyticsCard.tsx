
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  children?: ReactNode;
  className?: string;
}

export const AnalyticsCard = ({
  title,
  value,
  trend,
  children,
  className,
}: AnalyticsCardProps) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold">{value}</div>
          {trend && (
            <span
              className={
                trend.isPositive
                  ? "text-green-500 text-sm"
                  : "text-red-500 text-sm"
              }
            >
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </span>
          )}
        </div>
        {children}
      </CardContent>
    </Card>
  );
};
