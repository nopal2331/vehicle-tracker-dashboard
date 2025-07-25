import { create } from 'zustand';
import { getVehicleList, getVehicleDetail } from '@/api/vehicleApi';
import type { Vehicle, VehicleDetail } from '@/types';

interface VehicleListStore {
  vehicles: Vehicle[];
  loading: boolean;
  error: string | null;
  fetchVehicles: () => Promise<void>;
}

export const useVehicleListStore = create<VehicleListStore>((set) => ({
  vehicles: [],
  loading: false,
  error: null,
  fetchVehicles: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getVehicleList();
      
      const normalized = data.map((vehicle: Vehicle) => ({
        ...vehicle,
        status: (vehicle.status?.toLowerCase() ?? 'inactive') as 'active' | 'inactive' | 'maintenance',
      }));

      set({ vehicles: normalized, loading: false });
    } catch (err: any) {
      set({ error: err.message || 'Terjadi kesalahan', loading: false });
    }
  },
}));

interface VehicleDetailStore {
  detail: VehicleDetail | null;
  loading: boolean;
  error: string | null;
  fetchVehicleDetail: (id: string) => Promise<void>;
}

export const useVehicleDetailStore = create<VehicleDetailStore>((set) => ({
  detail: null,
  loading: false,
  error: null,
  fetchVehicleDetail: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const data = await getVehicleDetail(id);
      set({ detail: data, loading: false });
    } catch (err: any) {
      set({ error: err.message || 'Gagal memuat detail kendaraan', loading: false });
    }
  },
}));