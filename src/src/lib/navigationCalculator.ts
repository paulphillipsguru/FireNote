/**
 * NavigationCalculator
 *
 * Usage example:
 *   const source = "456 412";
 *   const target = "457 414";
 *   const currentHeadingDeg = 240; // degrees from North
 *
 *   const result = NavigationCalculator.getDirectionAndDistance(
 *       source,
 *       target,
 *       currentHeadingDeg
 *   );
 *
 *   console.log(result);
 *   // {
 *   //   distanceMeters: number,
 *   //   bearingDeg: number,
 *   //   turnAngleDeg: number,
 *   //   direction: "UP" | "DOWN" | "LEFT" | "RIGHT"
 *   // }
 */
export class NavigationCalculator {
  /**
   * Given two 6-digit grid references (source and target), and a current heading:
   * 1) Calculates distance and bearing (as before).
   * 2) Returns 'direction' as UP, DOWN, LEFT, or RIGHT,
   *    based on the turn angle from the current heading.
   */
  public static getDirectionAndDistance(
    sourceRef: string,
    targetRef: string,
    currentHeadingDeg: number
  ): {
    distanceMeters: number;
    bearingDeg: number;
    turnAngleDeg: number;
    direction: "UP" | "DOWN" | "LEFT" | "RIGHT";
  } {
    try {
    // 1. Parse the source and target references into easting/northing
    const [srcE, srcN] = NavigationCalculator.parse6FigGridRef(sourceRef);
    const [tgtE, tgtN] = NavigationCalculator.parse6FigGridRef(targetRef);

    // 2. Compute easting/northing deltas
    const deltaE = tgtE - srcE;
    const deltaN = tgtN - srcN;

    // 3. Calculate distance
    const distanceMeters = Math.sqrt(deltaE * deltaE + deltaN * deltaN);

    // 4. Compute bearing from North, clockwise
    //    By using atan2(deltaE, deltaN).
    let bearingRad = Math.atan2(deltaE, deltaN);
    let bearingDeg = NavigationCalculator.toDegrees(bearingRad);
    // Normalize bearing to [0..360)
    if (bearingDeg < 0) {
      bearingDeg += 360;
    }

    // 5. Determine turn angle from current heading
    //    in the range -180..180
    let turnAngleDeg = bearingDeg - currentHeadingDeg;
    turnAngleDeg = NavigationCalculator.wrapAngleTo180(turnAngleDeg);

    // 6. Map turnAngleDeg to a simple UP, DOWN, LEFT, RIGHT
    const direction = NavigationCalculator.angleToDirection(turnAngleDeg);

    return {
      distanceMeters,
      bearingDeg,
      turnAngleDeg,
      direction,
    };
  }
  catch{
    return {
      distanceMeters:0,
      bearingDeg:0,
      turnAngleDeg:0,
      direction:'UP',
    };
  }
  }

  /**
   * Parse a 6-figure reference, e.g. "456 412"
   * => [45600, 41200] in meters.
   */
  private static parse6FigGridRef(gridRef: string): [number, number] {
    const parts = gridRef.trim().split(/\s+/);
    if (parts.length !== 2) {
      throw new Error(`Invalid 6-digit grid reference: "${gridRef}"`);
    }
    const easting100 = parseInt(parts[0], 10);
    const northing100 = parseInt(parts[1], 10);
    // Each digit = 100m
    return [easting100 * 100, northing100 * 100];
  }

  /**
   * Convert radians to degrees.
   */
  private static toDegrees(radians: number): number {
    return (radians * 180) / Math.PI;
  }

  /**
   * Wrap an angle in degrees into the range [-180, 180).
   */
  private static wrapAngleTo180(angleDeg: number): number {
    // reduce to [0..360)
    angleDeg = ((angleDeg % 360) + 360) % 360;
    // then shift to [-180..180)
    return angleDeg >= 180 ? angleDeg - 360 : angleDeg;
  }

  /**
   * Interpret turn angle into UP, DOWN, LEFT, RIGHT.
   * Example:
   *   - turnAngleDeg =  10 => "UP"
   *   - turnAngleDeg =  90 => "RIGHT"
   *   - turnAngleDeg = -10 => "UP"    (slight left turn is still basically "up")
   *   - turnAngleDeg = -100 => "LEFT"
   *   - turnAngleDeg =  179 => "DOWN" (nearly behind)
   */
  private static angleToDirection(
    turnAngleDeg: number
  ): "UP" | "DOWN" | "LEFT" | "RIGHT" {
    // We'll use simple thresholds:
    // -45 .. +45   => UP
    // +45 .. +135  => RIGHT
    // -135 .. -45  => LEFT
    // else         => DOWN

    if (turnAngleDeg >= -45 && turnAngleDeg < 45) {
      return "UP";
    } else if (turnAngleDeg >= 45 && turnAngleDeg < 135) {
      return "RIGHT";
    } else if (turnAngleDeg >= -135 && turnAngleDeg < -45) {
      return "LEFT";
    } else {
      // covers >= +135 or <= -135
      return "DOWN";
    }
  }
}
