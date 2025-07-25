import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Gauge, Clock } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { StatusBadge } from '@/shared/StatusBadge';
import type { Vehicle } from '@/types';

interface Props {
  vehicle: Vehicle;
  onViewDetails: (id: string) => void;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export function VehicleCard({ vehicle, onViewDetails }: Props) {
  const displayName = vehicle.name || `${vehicle.brand} ${vehicle.model}` || 'Kendaraan Tidak Dikenal';

  const displayDate =
    typeof vehicle.update_at === 'string' && !isNaN(Date.parse(vehicle.update_at))
      ? new Date(vehicle.update_at).toLocaleString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
      : 'N/A';

  return (
    <motion.div variants={cardVariants} className="flex">
      <Card className="flex flex-col w-full p-5 border-gray-200 hover:border-primary transition-colors cursor-pointer">
        <CardHeader className="p-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base font-bold">{displayName}</CardTitle>
            </div>
            <StatusBadge status={vehicle.status} />
          </div>

          <CardDescription className="flex items-center pt-2 text-xs">
            <MapPin className="h-3 w-3 mr-1.5 shrink-0" />
            <span className="truncate">{vehicle.location || 'Lokasi tidak diketahui'}</span>
          </CardDescription>

          {/* Debug: tampilkan raw update_at */}  
        </CardHeader>

        <CardContent className="p-0 mt-4 flex flex-col flex-grow space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center">
              <Gauge className="h-4 w-4 mr-2" /> Kecepatan
            </span>
            <span>{vehicle.speed ?? '0'} km/j</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center">
              <Clock className="h-4 w-4 mr-2" /> Update Terakhir
            </span>
            <span className="text-muted-foreground">{displayDate}</span>
          </div>

          <Button onClick={() => onViewDetails(vehicle.id)} className="w-full mt-4 bg-gray-900 hover:bg-gray-800 cursor-pointer">
            Lihat Detail
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}