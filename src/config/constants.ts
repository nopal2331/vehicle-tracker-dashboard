export const PAGINATION = {
  ITEMS_PER_PAGE: 9,
} as const;

export const TIMING = {
  SEARCH_DEBOUNCE_DELAY: 300,
  VEHICLE_DETAIL_REFRESH_INTERVAL: 30000, 
} as const;

export const API = {
  BASE_URL: 'https://68807e87f1dcae717b623328.mockapi.io/api/v1',
  ENDPOINTS: {
    VEHICLES: '/vehicles',
    VEHICLE_DETAIL: '/vehicle2',
  },
} as const;

export const VEHICLE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  MAINTENANCE: 'maintenance',
} as const;

export const getSpeedColorClass = (speed: number, status: string): string => {
  if (status !== VEHICLE_STATUS.ACTIVE) return 'text-muted-foreground';
  if (speed > 80) return 'text-red-600 font-bold';
  if (speed > 40) return 'text-amber-600 font-semibold';
  return 'text-green-600';
};

export const buildMapUrl = (lat: number, lng: number): string => {
  const zoomOffset = 0.005;
  const bounds = {
    west: lng - zoomOffset,
    south: lat - zoomOffset,
    east: lng + zoomOffset,
    north: lat + zoomOffset,
  };
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bounds.west},${bounds.south},${bounds.east},${bounds.north}&layer=mapnik&marker=${lat},${lng}`;
};