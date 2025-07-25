import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

type IconComponent = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;

interface InfoItemProps {
  icon: IconComponent;
  label: string;
  value: string | number;
  unit?: string;
}

export const InfoItem = ({ icon: Icon, label, value, unit }: InfoItemProps) => {
  // Handle different value types
  const displayValue = () => {
    if (value === null || value === undefined || value === '') {
      return '-';
    }
    return value.toString();
  };

  const hasValidValue = value !== null && value !== undefined && value !== '' && value !== '-';

  return (
    <Card className="bg-slate-50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {displayValue()}
          {hasValidValue && unit && (
            <span className="text-xs font-normal text-muted-foreground ml-1">{unit}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};