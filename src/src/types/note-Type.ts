
export type NoteEntry = {
    Id: number;
    Lat: number;
    Long: number;
    Ref: string;
    CurrentLocation: string;
    Heading: string;
    Date: string;
    Name: string;
    Title: string;
    Category: string;
    BackgroundIcon: string;
    Content: string;
    LastUpdated: string;
    Form: Array<any>
}

export type Note = {
    Id: number
    Name: string;
    Date: string;
    Temp: 0;
    RH: 0;
    Wind: 0;
    FuelLoad: 0;
    Drought: 0;
    Slope: 0;
    Enteries: Array<NoteEntry>
}