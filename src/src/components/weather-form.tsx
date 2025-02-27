import NumberInput from "./shared/number-input";
import { useNoteStore,INoteStore } from "../state/note-state";
const Weather = () => {
    var temp = useNoteStore((state: INoteStore) => state.CurrentNote.Temp);
    var setTemp = useNoteStore((state: INoteStore) => state.setTemp);
    var rH = useNoteStore((state: INoteStore) => state.CurrentNote.RH);
    var setRH = useNoteStore((state: INoteStore) => state.setRH);
    var wind = useNoteStore((state: INoteStore) => state.CurrentNote.Wind);
    var setWind = useNoteStore((state: INoteStore) => state.setWind);
    var fuelLoad = useNoteStore((state: INoteStore) => state.CurrentNote.FuelLoad);
    var setFuelLoad = useNoteStore((state: INoteStore) => state.setFuelLoad);
    var droughtFactor = useNoteStore((state: INoteStore) => state.CurrentNote.Drought);
    var setDrought = useNoteStore((state: INoteStore) => state.setDrought);
    var slope = useNoteStore((state: INoteStore) => state.CurrentNote.Slope);
    var setSlope = useNoteStore((state: INoteStore) => state.setSlope);
    return (<>
        <div className="m-5">
            <NumberInput title="TEMP" onChange={setTemp} value={temp} />  
            <NumberInput title="RH" onChange={setRH} value={rH}/>        
            <NumberInput title="Wind" onChange={setWind} value={wind}/>
            <NumberInput title="Fuel Load" onChange={setFuelLoad} value={fuelLoad}/>
            <NumberInput title="Drought Factor" onChange={setDrought} value={droughtFactor}/>
            <NumberInput title="Slope" onChange={setSlope} value={slope}/>
        </div>
    </>)
}

export default Weather;
