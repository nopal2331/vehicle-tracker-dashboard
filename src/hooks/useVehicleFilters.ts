import { useMemo, useState } from 'react';
import { PAGINATION } from '@/config/constants';
import type { Vehicle } from '@/types'; 

interface UseVehicleFiltersProps {
  vehicles: Vehicle[];
}

interface UseVehicleFiltersReturn {
  paginatedVehicles: Vehicle[];
  filteredVehicles: Vehicle[];
  totalPages: number;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export function useVehicleFilters({
  vehicles,
}: UseVehicleFiltersProps): UseVehicleFiltersReturn {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const matchesSearch =
        vehicle.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.id?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' ||
        vehicle.status?.toLowerCase() === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [vehicles, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredVehicles.length / PAGINATION.ITEMS_PER_PAGE);

  const paginatedVehicles = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGINATION.ITEMS_PER_PAGE;
    const endIndex = startIndex + PAGINATION.ITEMS_PER_PAGE;
    return filteredVehicles.slice(startIndex, endIndex);
  }, [filteredVehicles, currentPage]);

  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  return {
    paginatedVehicles,
    filteredVehicles,
    totalPages,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
  };
}