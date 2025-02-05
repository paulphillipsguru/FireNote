import { create } from 'zustand'
import { persist } from "zustand/middleware";

export interface ILocationStore {
    Lat: number,
    Long: number,
    Deg:number,
    Address: string,
    Ref: string,
    Heading: string,
    OpsHeading: string,
    update: (name: string, lat: number, long: number, address: string) => void;
    setHeadng: (deg:number, heading: string, opsHeading: string) => void;
}

export const useLocationStore = create(persist<ILocationStore>(
    (set) => ({
        Lat: 0,
        Long: 0,
        Deg: 0,
        Address: "",
        Heading: "",
        OpsHeading: "",
        Ref: "",
        setHeadng: (deg: number,heading: string, opsHeading: string) => {
            set((state: ILocationStore) => ({
                ...state,
                Deg:deg,
                Heading: heading,
                OpsHeading: opsHeading
            }))
        },
        update: (ref: string, lat: number, long: number, address: string) => {
            set(() => ({
                Lat: lat,
                Long: long,
                Ref: ref,
                Address: address
            }));
        }

    }), {
    name: "location-storage", // Key for localStorage (required)

    onRehydrateStorage: () => {
        console.log("Rehydrating location state from localStorage...");
    }
}));