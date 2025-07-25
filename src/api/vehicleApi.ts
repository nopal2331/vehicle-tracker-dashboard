import axios from 'axios';
import { API } from '@/config/constants';
import type { Vehicle, VehicleDetail } from '@/types';

export async function getVehicleList(): Promise<Vehicle[]> {
  try {
    const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.VEHICLES}`);
    if (!response.ok) {
      throw new Error('Gagal mengambil daftar kendaraan.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching vehicle list:', error);
    throw error;
  }
}

export async function getVehicleDetail(id: string): Promise<VehicleDetail> {
  try {
    const response = await axios.get(`${API.BASE_URL}${API.ENDPOINTS.VEHICLE_DETAIL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching vehicle detail:', error);
    throw new Error('Gagal mengambil detail kendaraan.');
  }
}