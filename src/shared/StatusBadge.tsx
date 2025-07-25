import { cn } from "@/lib/utils";
import { VEHICLE_STATUS } from "@/config/constants";

const statusStyles: Record<string, string> = {
  [VEHICLE_STATUS.ACTIVE]: "bg-green-500 text-white",
  [VEHICLE_STATUS.INACTIVE]: "bg-red-500 text-white",
  [VEHICLE_STATUS.MAINTENANCE]: "bg-yellow-500 text-black",
};

const statusLabels: Record<string, string> = {
  [VEHICLE_STATUS.ACTIVE]: "Aktif",
  [VEHICLE_STATUS.INACTIVE]: "Tidak Aktif",
  [VEHICLE_STATUS.MAINTENANCE]: "Perawatan",
}

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const normalizedStatus = status?.toLowerCase() || VEHICLE_STATUS.INACTIVE;
  const style = statusStyles[normalizedStatus] || statusStyles[VEHICLE_STATUS.INACTIVE];
  const label = statusLabels[normalizedStatus] || "Tidak Aktif";

  return (
    <div className={cn("text-xs font-semibold px-2.5 py-1 rounded-full w-fit", style, className)}>
      {label}
    </div>
  );
}