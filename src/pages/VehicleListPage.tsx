import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVehicleFilters } from '@/hooks/useVehicleFilters';
import { AnimatePresence, motion } from 'framer-motion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { VehicleListHeader } from '@/components/list/VehicleListHeader';
import { VehicleStats } from '@/components/list/VehicleStats';
import { VehicleFilters } from '@/components/list/VehicleFilters';
import { VehicleCard } from '@/components/list/VehicleCard';
import { VehiclePagination } from '@/components/list/VehiclePagination';
import { VehicleListSkeleton } from '@/components/list/VehicleListSkeleton';
import { useVehicleListStore } from '@/store/VehicleDataStore';

export default function VehicleListPage() {
  const navigate = useNavigate();
  const { vehicles, loading, error, fetchVehicles } = useVehicleListStore();
  
  const {
    paginatedVehicles,
    filteredVehicles,
    totalPages,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage
  } = useVehicleFilters({
    vehicles,
  });

  useEffect(() => {
    if (vehicles.length === 0) {
      fetchVehicles();
    }
  }, [fetchVehicles, vehicles.length]);

  if (loading) return <VehicleListSkeleton />;

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md text-center">
          <AlertCircle className="h-5 w-5 mx-auto mb-2" />
          <AlertTitle>Gagal Memuat Data</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
          <Button onClick={fetchVehicles} variant="destructive" className="mt-4">
            <RefreshCw className="mr-2 h-4 w-4" /> Coba Lagi
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <VehicleListHeader totalVehicles={vehicles.length} />
        <VehicleStats vehicles={filteredVehicles} />
        
        <div className="space-y-4">
          <VehicleFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
          />

          <p className="text-sm text-muted-foreground pt-2">
            Menampilkan {filteredVehicles.length} dari {vehicles.length} kendaraan
          </p>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence>
              {paginatedVehicles.map(vehicle => (
                <VehicleCard 
                  key={vehicle.id} 
                  vehicle={vehicle} 
                  onViewDetails={(id) => navigate(`/vehicles/${id}`)}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredVehicles.length === 0 && !loading && (
            <div className='text-center py-16 bg-card rounded-xl'>
               <h3 className='text-xl font-semibold'>Tidak Ada Hasil</h3>
               <p className='text-muted-foreground'>Coba ubah kata kunci pencarian atau filter Anda.</p>
            </div>
          )}

          <VehiclePagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}