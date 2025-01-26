
import GPSConverter from '../lib/gps';
import UTMLatLng from '../lib/utm';

export default class LocationService {
    static lastLat: number;
    static lastLong: number

    static formatDateToDDMMYYYY = (date: Date): string => {

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        const hour = date.getHours();
        const min = date.getMinutes();

        return `${day}/${month}/${year} ${hour}:${min}`;
    }
    static GetDirectionFromHeading(heading: number) {
        // Ensure the heading is within 0 to 360
        heading = heading % 360;
        if (heading < 0) {
            heading += 360;
        }

        // Define compass directions based on heading ranges
        if (heading >= 337.5 || heading < 22.5) return "N";
        if (heading >= 22.5 && heading < 67.5) return "NE";
        if (heading >= 67.5 && heading < 112.5) return "E";
        if (heading >= 112.5 && heading < 157.5) return "SE";
        if (heading >= 157.5 && heading < 202.5) return "S";
        if (heading >= 202.5 && heading < 247.5) return "SW";
        if (heading >= 247.5 && heading < 292.5) return "W";
        if (heading >= 292.5 && heading < 337.5) return "NW";

        // Fallback in case of unexpected input
        return "Invalid Heading";
    }

    static SetCurrentLocation = async (lat: number, long: number) => {
        var uLatLongService = new UTMLatLng();
        var gps = await GPSConverter.GetGPSLocation();
        var utm = uLatLongService.ConvertLatLngToUtm(gps.Latitude, gps.Longitude, 1) as any;
        if (this.lastLat !== lat && this.lastLong !==long){
        this.lastLat = lat;
        this.lastLong = long;

        var location = await LocationService.LoadLocation(gps.Latitude, gps.Longitude);

        return {
            Lat: gps.Latitude,
            Long: gps.Longitude,
            Ref: utm.EastRef + " " + utm.NorthRef,
            Location: location
        }
    }


    }

    static LoadLocation = async (lat: number, long: number) => {

        const url = "https://nominatim.openstreetmap.org/search?q=" + lat + " " + long + "&format=json";

        try {
            var result = await fetch(url);
            var data = await result.json();

            return data[0].display_name;


        }

        catch (error: any) {

            return;
        }
    }


}