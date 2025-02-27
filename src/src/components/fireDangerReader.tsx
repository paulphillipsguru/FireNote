import { INoteStore, useNoteStore } from '../state/note-state'
import {fireDangerCalc, FireModel} from '../lib/calculateFireDanger';
const FireDangerReader = () => {
    var noteStore = useNoteStore((state: INoteStore) => state);
    if (noteStore.CurrentNote.Id === 0) {
        return (<></>)
    }

    var currentNote = noteStore.CurrentNote;
   
    var fireModel = {
        DroughtFactor: currentNote.Drought,
        FuelLoad: currentNote.FuelLoad,
        GroundSlope: currentNote.Slope,
        RH: currentNote.RH,
        Temp: currentNote.Temp,
        WindSpeed: currentNote.Wind

    } as FireModel; 
    var response = fireDangerCalc.calc(fireModel);
    
    return (<>
        <div className="bg-gray-900">
            <div className="mx-auto max-w-7xl">
                <div key="fh" className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
                    <p className="text-sm font-medium leading-6 text-gray-400">FDI</p>
                    <p className="mt-2 flex items-baseline gap-x-2">
                        <span className="text-2xl font-semibold tracking-tight text-white">{response.FDI} {response.FDIName}</span>
                    </p>
                </div>
                <div key="fh" className="bg-gray-900 px-6">
                    <p className="text-sm font-medium leading-6 text-gray-400">FLAME HEIGHT (m)</p>
                    <p className="mt-2 flex items-baseline gap-x-2">
                        <span className="text-2xl font-semibold tracking-tight text-white">{response.FlameHeight.toFixed(2)}</span>
                    </p>
                </div>
                <div key="fh" className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
                    <p className="text-sm font-medium leading-6 text-gray-400">SPOTTING DISTANCE (Per Hour)</p>
                    <p className="mt-2 flex items-baseline gap-x-2">
                        <span className="text-2xl font-semibold tracking-tight text-white">{fireDangerCalc.formatDistance(response.SpottingDistance)}</span>
                    </p>
                </div>
                <div key="fh" className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
                    <p className="text-sm font-medium leading-6 text-gray-400">RATE OF SPREAD</p>
                    <p className="mt-2 flex items-baseline gap-x-2">
                        <span className="text-2xl font-semibold tracking-tight text-white">{fireDangerCalc.formatDistance(response.RateOfSpread)}</span>
                    </p>
                </div>
                <div key="fh" className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
                    <p className="text-sm font-medium leading-6 text-gray-400">FMC</p>
                    <p className="mt-2 flex items-baseline gap-x-2">
                        <span className="text-2xl font-semibold tracking-tight text-white">{response.FMC.toFixed(2)}% </span>
                    </p>
                </div>
             
            </div></div></>)
}

export default FireDangerReader;