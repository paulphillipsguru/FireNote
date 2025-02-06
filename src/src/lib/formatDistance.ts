/**
 * Returns a friendly distance string based on the input in meters.
 * - If < 1000, returns e.g. "275 m".
 * - If >= 1000, returns e.g. "1.2 km".
 *
 * Example:
 *   formatDistance(275)   -> "275 m"
 *   formatDistance(1200)  -> "1.2 km"
 *   formatDistance(999.5) -> "1000 m" or "1.0 km" (depending on your preference)
 */
export function formatDistance(distanceMeters: number): string {
    if (distanceMeters < 1000) {
      // Less than 1km; show in meters
      // Round or truncate as you see fit. Here we round to whole meters.
      return `${Math.round(distanceMeters)} m`;
    } else {
      // 1km or more; show in kilometers with 1 decimal place
      const distanceKm = distanceMeters / 1000;
      return `${distanceKm.toFixed(1)} km`;
    }
  }
  