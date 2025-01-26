
export type NoteEntry = {
    Id: number;
    Lat: number;
    Long: number;
    Ref: string;
    CurrentLocation: string;
    Heading: string;
    Date: string;    
    Name: string;
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
    Enteries: Array<NoteEntry>
}