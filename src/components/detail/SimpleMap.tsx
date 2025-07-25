import { Car, Navigation, ExternalLink, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { buildMapUrl } from '@/config/constants';

interface SimpleMapProps {
  latitude: number; 
  longitude: number; 
  vehicleName: string;
}

export const SimpleMap = ({ latitude, longitude, vehicleName }: SimpleMapProps) => {
  const [copied, setCopied] = useState(false);
  const [notification, setNotification] = useState<{show: boolean, message: string, type: 'success' | 'error'}>({
    show: false,
    message: '',
    type: 'success'
  });
  
  const mapUrl = buildMapUrl(latitude, longitude);
  
  // Generate navigation URLs
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  const appleMapsUrl = `https://maps.apple.com/?daddr=${latitude},${longitude}`;
  const wazeUrl = `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;
  const openStreetMapUrl = `https://www.openstreetmap.org/directions?to=${latitude},${longitude}`;
  
  const coordinatesText = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const handleCopyCoordinates = async () => {
    try {
      await navigator.clipboard.writeText(coordinatesText);
      setCopied(true);
      showNotification("Koordinat berhasil disalin ke clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      try {
        const textArea = document.createElement('textarea');
        textArea.value = coordinatesText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        setCopied(true);
        showNotification("Koordinat berhasil disalin ke clipboard!");
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        showNotification("Gagal menyalin koordinat ke clipboard", 'error');
      }
    }
  };

  const handleNavigate = (url: string, appName: string) => {
    window.open(url, '_blank');
    showNotification(`Membuka ${appName} untuk navigasi ke lokasi`);
  };

  return (
    <div className="relative bg-gray-100 rounded-lg overflow-hidden h-80 group">
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        title="Lokasi Kendaraan"
        loading="lazy"
        className="rounded-lg"
      />
      
      {/* Custom Notification */}
      {notification.show && (
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 px-4 py-2 rounded-lg shadow-lg ${
          notification.type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        } animate-in fade-in slide-in-from-bottom-2 duration-300`}>
          <div className="flex items-center space-x-2">
            {notification.type === 'success' ? (
              <Check className="h-4 w-4" />
            ) : (
              <ExternalLink className="h-4 w-4" />
            )}
            <span className="text-sm font-medium">{notification.message}</span>
          </div>
        </div>
      )}
      
      {/* Vehicle Info Card */}
      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border border-white/20">
        <div className="flex items-center space-x-2">
          <Car className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium">{vehicleName}</span>
        </div>
        <div className="text-xs text-gray-600 mt-1 flex items-center space-x-2">
          <span>{latitude.toFixed(4)}, {longitude.toFixed(4)}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 hover:bg-gray-100 transition-colors"
            onClick={handleCopyCoordinates}
            title="Salin koordinat"
          >
            {copied ? (
              <Check className="h-3 w-3 text-green-600" />
            ) : (
              <Copy className="h-3 w-3 text-gray-500 hover:text-gray-700" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute top-3 right-3 flex space-x-2">
        {/* Quick Google Maps Navigation */}
        <Button
          size="sm"
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-200 hover:scale-105"
          onClick={() => handleNavigate(googleMapsUrl, 'Google Maps')}
        >
          <Navigation className="h-4 w-4 mr-1" />
          Navigasi
        </Button>

        {/* More Options Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              size="sm"
              className="bg-white/95 backdrop-blur-sm hover:bg-white shadow-lg border border-white/20 transition-all duration-200 hover:scale-105"
              title="Opsi navigasi lainnya"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem 
              onClick={() => handleNavigate(googleMapsUrl, 'Google Maps')}
              className="cursor-pointer hover:bg-blue-50"
            >
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded-sm flex items-center justify-center">
                  <span className="text-xs text-white font-bold">G</span>
                </div>
                <span>Google Maps</span>
              </div>
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              onClick={() => handleNavigate(appleMapsUrl, 'Apple Maps')}
              className="cursor-pointer hover:bg-gray-50"
            >
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-800 rounded-sm flex items-center justify-center">
                  <span className="text-xs text-white">🍎</span>
                </div>
                <span>Apple Maps</span>
              </div>
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              onClick={() => handleNavigate(wazeUrl, 'Waze')}
              className="cursor-pointer hover:bg-blue-50"
            >
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-400 rounded-sm flex items-center justify-center">
                  <span className="text-xs text-white font-bold">W</span>
                </div>
                <span>Waze</span>
              </div>
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              onClick={() => handleNavigate(openStreetMapUrl, 'OpenStreetMap')}
              className="cursor-pointer hover:bg-green-50"
            >
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-600 rounded-sm flex items-center justify-center">
                  <span className="text-xs text-white font-bold">O</span>
                </div>
                <span>OpenStreetMap</span>
              </div>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem 
              onClick={handleCopyCoordinates}
              className="cursor-pointer hover:bg-gray-50"
            >
              <div className="flex items-center space-x-2">
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4 text-gray-500" />
                )}
                <span>{copied ? 'Tersalin!' : 'Salin Koordinat'}</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Status indicator */}
      <div className="absolute bottom-3 right-3 bg-green-500/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-md">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="text-xs text-white font-medium">Live</span>
        </div>
      </div>

      {/* Hover overlay for better UX */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="absolute inset-0 bg-black/5"></div>
      </div>
    </div>
  );
};