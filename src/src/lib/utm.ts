interface UtmResult {
  Easting: number;
  EastRef: string;
  Northing: number;
  NorthRef: string;
  ZoneNumber: number;
  ZoneLetter: string;
}

class UTMLatLng {
  private datumName: string;
  private a: number;
  private eccSquared: number;
  private status: boolean;

  constructor(datumName: string = "WGS 84") {
    this.datumName = datumName;
    this.a = 0;
    this.eccSquared = 0;
    this.status = false;
    this.SetEllipsoid(this.datumName);
  }

  SetEllipsoid(name: string): void {
    switch (name) {
      case 'WGS 84':
        this.a = 6378137;
        this.eccSquared = 0.00669438;
        this.status = false;
        break;
      default:
        this.status = true;
        break;
    }
  }

  ToDegrees(rad: number): number {
    return (rad / Math.PI) * 180;
  }

  ToRadians(deg: number): number {
    return (deg * Math.PI) / 180;
  }

  GetUtmLetterDesignator(latitude: number): string {
    if (latitude >= 84 || latitude < -80) return 'Z';
    const zones = [
      'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X'
    ];
    return zones[Math.floor((latitude + 80) / 8)];
  }

  ConvertLatLngToUtm(latitude: number, longitude: number, precision: number): UtmResult | string {
    const { a, eccSquared, status, datumName } = this;

    if (status) {
      return `No ellipsoid data associated with unknown datum: ${datumName}`;
    }

    if (!Number.isInteger(precision)) {
      return 'Precision is not an integer number.';
    }

    const LatRad = this.ToRadians(latitude);
    const LongRad = this.ToRadians(longitude);
    let ZoneNumber = Math.floor((longitude + 180) / 6) + 1;

    if (latitude >= 72.0 && latitude < 84.0) {
      if (longitude >= 0.0 && longitude < 9.0) ZoneNumber = 31;
      else if (longitude >= 9.0 && longitude < 21.0) ZoneNumber = 33;
      else if (longitude >= 21.0 && longitude < 33.0) ZoneNumber = 35;
      else if (longitude >= 33.0 && longitude < 42.0) ZoneNumber = 37;
    }

    const LongOrigin = (ZoneNumber - 1) * 6 - 180 + 3;
    const LongOriginRad = this.ToRadians(LongOrigin);

    const UTMZone = this.GetUtmLetterDesignator(latitude);

    const eccPrimeSquared = eccSquared / (1 - eccSquared);
    const N = a / Math.sqrt(1 - eccSquared * Math.sin(LatRad) ** 2);
    const T = Math.tan(LatRad) ** 2;
    const C = eccPrimeSquared * Math.cos(LatRad) ** 2;
    const A = Math.cos(LatRad) * (LongRad - LongOriginRad);

    const M =
      a * ((1 - eccSquared / 4 - (3 * eccSquared ** 2) / 64 - (5 * eccSquared ** 3) / 256) * LatRad -
        ((3 * eccSquared) / 8 + (3 * eccSquared ** 2) / 32 + (45 * eccSquared ** 3) / 1024) *
        Math.sin(2 * LatRad) +
        ((15 * eccSquared ** 2) / 256 + (45 * eccSquared ** 3) / 1024) * Math.sin(4 * LatRad) -
        ((35 * eccSquared ** 3) / 3072) * Math.sin(6 * LatRad));

    let UTMEasting =
      0.9996 *
      N *
      (A + (1 - T + C) * A ** 3 / 6 + (5 - 18 * T + T ** 2 + 72 * C - 58 * eccPrimeSquared) * A ** 5 / 120) +
      500000.0;

    let UTMNorthing =
      0.9996 *
      (M +
        N *
        Math.tan(LatRad) *
        (A ** 2 / 2 + (5 - T + 9 * C + 4 * C ** 2) * A ** 4 / 24 +
          (61 - 58 * T + T ** 2 + 600 * C - 330 * eccPrimeSquared) * A ** 6 / 720));

    if (latitude < 0) UTMNorthing += 10000000.0;

    var eRef = Math.round(UTMEasting);
    var nRef = Math.round(UTMNorthing);
    return {
      Easting: eRef,
      EastRef: eRef.toString().substring(1, 4),
      Northing: nRef,
      NorthRef: nRef.toString().substring(2, 5),
      ZoneNumber,
      ZoneLetter: UTMZone,
    };
  }
}

export default UTMLatLng;
