export interface Coordinates {
    Latitude: number;
    Longitude: number;
}

export interface UTMCoordinates {
    zone: number;
    easting: number;
    northing: number;
}

export class GPSConverter {    
    static async GetGPSLocation(): Promise<Coordinates> {
        return new Promise<Coordinates>((resolve, reject) => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position: GeolocationPosition) => {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        resolve({ Latitude: latitude, Longitude: longitude });
                    },
                    (error: GeolocationPositionError) => {
                        reject(new Error(error.message));
                    }
                );
            } else {
                reject(new Error("Geolocation is not supported by this browser."));
            }
        });
    }        
}

export default GPSConverter;

