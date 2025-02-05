/**
 * GridRefCalculator
 * 
 * Example usage:
 *   const originalRef = "456 412";
 *   const bearingDeg = 240;
 *   const newRef = GridRefCalculator.moveByDistance(
 *       originalRef, bearingDeg, 100
 *   );
 *   console.log(newRef); // e.g. "455 412"
 */
export class GridRefCalculator {
  
    /**
     * Move from the original 6-figure grid reference by a certain
     * distance (in meters) along a given bearing (in degrees from North).
     */
    public static moveByDistance(
      originalRef: string,
      bearingDeg: number,
      distanceMeters: number
    ): string {
      // 1. Parse input "456 412" => easting=456, northing=412
      const [eastingStr, northingStr] = originalRef.split(" ");
      if (!eastingStr || !northingStr) {
        throw new Error(`Invalid grid reference format: ${originalRef}`);
      }
  
      let eastingNum = parseInt(eastingStr, 10);
      let northingNum = parseInt(northingStr, 10);
  
      // Each digit = 100m in a 6-figure reference
      let eastingMeters = eastingNum * 100;
      let northingMeters = northingNum * 100;
  
      // 2. Convert bearing to radians (clockwise from North)
      const bearingRad = (bearingDeg * Math.PI) / 180;
  
      // 3. Calculate offsets
      //    - For bearings from North, clockwise:
      //      deltaE = distance * sin(bearing)
      //      deltaN = distance * cos(bearing)
      const deltaE = distanceMeters * Math.sin(bearingRad);
      const deltaN = distanceMeters * Math.cos(bearingRad);
  
      // 4. Apply offset
      eastingMeters += deltaE;
      northingMeters += deltaN;
  
      // 5. Convert back to 6-figure grid ref
      //    - Divide by 100 to return to '6-figure' scale
      eastingNum = Math.round(eastingMeters / 100);
      northingNum = Math.round(northingMeters / 100);
  
      // 6. Construct the string with a space in between
      const newRef = `${eastingNum} ${northingNum}`;
      return newRef;
    }
  }
  