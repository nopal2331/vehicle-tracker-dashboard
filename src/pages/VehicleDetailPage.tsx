import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  AlertCircle, ArrowLeft, Clock, Fuel, Gauge, MapPin, RefreshCw, Ruler, UserRound
} from 'lucide-react';
import { TIMING } from '@/config/constants';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InfoItem } from '@/components/detail/InfoItem';
import { SimpleMap } from '@/components/detail/SimpleMap';
import { VehicleDetailSkeleton } from '@/components/detail/VehicleDetailSkeleton';
import { StatusBadge } from '@/shared/StatusBadge';
import { useVehicleDetailStore } from '@/store/VehicleDataStore';
import { Progress } from '@/components/ui/progress';

export function VehicleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { detail, loading, error, fetchVehicleDetail } = useVehicleDetailStore();

  useEffect(() => {
    if (id) {
      fetchVehicleDetail(id);
      const intervalId = setInterval(() => fetchVehicleDetail(id), TIMING.VEHICLE_DETAIL_REFRESH_INTERVAL);
      return () => clearInterval(intervalId);
    }
  }, [id, fetchVehicleDetail]);

  // Helper function untuk format tanggal
  const formatDate = (dateValue: string | number | Date | undefined) => {
    if (!dateValue) return 'N/A';

    try {
      const date = new Date(dateValue);
      if (isNaN(date.getTime())) return 'N/A';

      return date.toLocaleString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch {
      return 'N/A';
    }
  };

  // Helper function untuk format waktu saja
  const formatTime = (dateValue: string | number | Date | undefined) => {
    if (!dateValue) return '-';

    try {
      const date = new Date(dateValue);
      if (isNaN(date.getTime())) return '-';

      return date.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return '-';
    }
  };

  if (loading && !detail) return <VehicleDetailSkeleton />;

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Alert variant="destructive" className="max-w-md text-center">
          <AlertCircle className="h-5 w-5 mx-auto mb-2" />
          <AlertTitle>Gagal Memuat Data</AlertTitle>
          <AlertDescription>
            {error}
            <Button onClick={() => id && fetchVehicleDetail(id)} className="mt-4">
              <RefreshCw className="mr-2 h-4 w-4" /> Coba Lagi
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!detail) return null;

  return (
    <div className="min-h-screen bg-muted/40">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <Button variant="ghost" onClick={() => navigate('/vehicles')} className="text-muted-foreground">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali ke Daftar Armada
        </Button>

        <div className="relative overflow-hidden rounded-2xl shadow-md">
          <img
            src={`https://source.unsplash.com/800x300/?car,${detail.name || 'vehicle'}`}
            alt={detail.name || 'Kendaraan'}
            className="w-full h-[200px] object-cover brightness-90"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6 text-white">
            <h2 className="text-3xl font-bold">{detail.name || 'Kendaraan Tidak Dikenal'}</h2>
            <p className="text-sm">Terakhir update: {formatDate(detail.update_at)}</p>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-5 lg:gap-8">
          <div className="lg:col-span-3 space-y-6">
            {/* Main Info */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{detail.name || 'Kendaraan Tidak Dikenal'}</CardTitle>
                    <p className="text-muted-foreground text-sm">ID Kendaraan: {detail.vehicleId || detail.id}</p>
                  </div>
                  <StatusBadge status={detail.status || 'inactive'} />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <InfoItem
                    icon={Fuel}
                    label="Bahan Bakar"
                    value={detail.fuel_level ?? 0}
                    unit="%"
                  />
                  <InfoItem
                    icon={Ruler}
                    label="Odometer"
                    value={detail.odometer?.toLocaleString('id-ID') ?? '0'}
                    unit="km"
                  />
                  <InfoItem
                    icon={Gauge}
                    label="Kecepatan"
                    value={detail.speed ?? 0}
                    unit="km/h"
                  />
                  <InfoItem
                    icon={Clock}
                    label="Update"
                    value={formatTime(detail.timestamp || detail.update_at)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium">Level Bahan Bakar</label>
                    <Progress value={detail.fuel_level || 0} className="h-2 mt-1 bg-gray-200" />
                    <p className="text-xs text-muted-foreground mt-1">{detail.fuel_level || 0}% tersisa</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Driver Info - Conditional rendering */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserRound className="mr-2 h-5 w-5 text-muted-foreground" />
                  Informasi Pengemudi
                </CardTitle>
              </CardHeader>
              <CardContent>
                {detail.driver? (
                  <div className="text-center py-8">
                    <UserRound className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                    <p className="text-lg font-semibold">{detail.driver}</p>
                    <p className="text-sm text-muted-foreground mt-1">Pengemudi kendaraan</p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <UserRound className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                    <p className="text-muted-foreground">Data pengemudi tidak tersedia</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Informasi pengemudi akan ditampilkan ketika tersedia dari sistem
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Map Location */}
          <div className="lg:col-span-2 mt-8 lg:mt-0">
            <div className="lg:sticky lg:top-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-primary" /> Lokasi Kendaraan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {detail.latitude && detail.longitude ? (
                    <>
                      <SimpleMap
                        latitude={detail.latitude}
                        longitude={detail.longitude}
                        vehicleName={detail.name || 'Kendaraan'}
                      />
                      <div className="text-xs text-muted-foreground text-center mt-2">
                        Koordinat: {detail.latitude.toFixed(6)}, {detail.longitude.toFixed(6)}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-16">
                      <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                      <p className="text-muted-foreground">Data lokasi tidak tersedia</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Lokasi akan ditampilkan ketika GPS aktif
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}