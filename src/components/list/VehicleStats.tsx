import { Card } from '@/components/ui/card';
import { Car, ShieldAlert, Gauge, Wrench } from 'lucide-react';
import type { Vehicle } from '@/types';

interface Props {
  vehicles: Vehicle[];
}

export function VehicleStats({ vehicles }: Props) {
  const activeCount = vehicles.filter(v => v.status === 'active').length;
  const inactiveCount = vehicles.filter(v => v.status === 'inactive').length;
  const maintenanceCount = vehicles.filter(v => v.status === 'maintenance').length;
  
  const avgSpeed = vehicles.length > 0
    ? Math.round(vehicles.reduce((acc, v) => acc + (v.speed || 0), 0) / vehicles.length)
    : 0;

  const stats = [
    { label: 'Aktif', value: activeCount, description: 'Kendaraan yang sedang aktif', icon: Car },
    { label: 'Tidak Aktif', value: inactiveCount, description: 'Kendaraan yang offline', icon: ShieldAlert },
    { label: 'Perawatan', value: maintenanceCount, description: 'Kendaraan dalam perawatan', icon: Wrench },
    { label: 'Kecepatan Rata-rata', value: `${avgSpeed} km/j`, description: 'Rata-rata kecepatan armada', icon: Gauge },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-2">{stat.description}</p>
            </div>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </div>
        </Card>
      ))}
    </div>
  );
}