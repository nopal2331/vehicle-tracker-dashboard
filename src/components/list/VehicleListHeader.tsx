import { Car } from 'lucide-react';

interface Props {
  totalVehicles: number;
}

export function VehicleListHeader({ totalVehicles }: Props) {
  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between mb-4">
      <div className="flex items-center gap-4">
        <div className="bg-primary flex items-center justify-center p-3 rounded-lg">
          <Car className="h-6 w-6 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Detail Kendaraan</h1>
      </div>
      <div className="mt-4 sm:mt-0 text-left sm:text-right">
        <p className="text-sm text-muted-foreground">Total Kendaraan</p>
        <p className="text-3xl font-bold text-gray-800">{totalVehicles}</p>
      </div>
    </header>
  );
}