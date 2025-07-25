export interface Vehicle {
  id: string;
  name?: string;
  brand?: string;
  model?: string;
  status: 'active' | 'inactive' | 'maintenance';
  speed: number;
  location?: string;
  update_at?: string | boolean | undefined ;
}

export interface VehicleDetail {
  id: string;
  vehicleId?: string;
  name?: string;
  status?: string;
  fuel_level?: number;
  odometer?: number;
  speed?: number;
  timestamp?: string;
  latitude?: number;
  longitude?: number;
  update_at?: string | number | Date;
  driver?: string;
  location?: string;
}