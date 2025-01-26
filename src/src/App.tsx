import './App.css'
import SummaryInfo from './components/summary-info';
import TopNav from './components/top-nav';
import NoteList from './components/note-list';
import LocationInfo from './components/location-info';
import LocationService from './services/location-service';  
import { ILocationStore, useLocationStore } from './state/location-state';


const App = () => { 
  const lat = useLocationStore((state: ILocationStore) => state.Lat);
  const long = useLocationStore((state: ILocationStore) => state.Long);
  const setHeading = useLocationStore((state: ILocationStore) => state.setHeadng);
  const updateLocation = useLocationStore((state: ILocationStore) => state.update);
 
  const handleOrientation = async (event: DeviceOrientationEvent) => {
    if (event.absolute && event.alpha !== null) {
      const compassHeading = 360 - event.alpha;
      setHeading(compassHeading.toFixed(0) + " (" + LocationService.GetDirectionFromHeading(compassHeading) + ")",((compassHeading + 180) % 360).toFixed(0) + " (" + LocationService.GetDirectionFromHeading((compassHeading + 180) % 360) + ")")
 

    }
  };
  window.addEventListener("deviceorientationabsolute", handleOrientation);
  setInterval(async () => {
  
    var result = await LocationService.SetCurrentLocation(lat,long, window.navigator.onLine);
    if (result !== undefined){
      updateLocation(result.Ref,result.Lat,result.Long,result.Location)
    }
  }, 2500);
 
  return (
    <>
    <LocationInfo/>
    <TopNav/>   
    <SummaryInfo/>
    <NoteList/>
    </>
  )
}

export default App
