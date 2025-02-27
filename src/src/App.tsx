import './App.css'
import SummaryInfo from './components/summary-info';
import TopNav from './components/top-nav';
import NoteList from './components/note-list';
import LocationInfo from './components/location-info';
import LocationService from './services/location-service';
import { ILocationStore, useLocationStore } from './state/location-state';
import { useNoteStore, INoteStore } from './state/note-state'
import GridRefCalc from './components/grid-calc';
import NavCalc from './components/nav-calc';
import Weather from './components/weather-form';
import Popup from './components/shared/dialog';

const App = () => {
  const setHeading = useLocationStore((state: ILocationStore) => state.setHeadng);
  const updateLocation = useLocationStore((state: ILocationStore) => state.update);
  const showItasc = useNoteStore((state: INoteStore) => state.ShowItascForm);
  const hideShowItaskForm = useNoteStore((state: INoteStore) => state.showItaskForm);

  const handleOrientation = async (event: DeviceOrientationEvent) => {
    if (event.absolute && event.alpha !== null) {
      const compassHeading = 360 - event.alpha;
      setHeading(compassHeading, compassHeading.toFixed(0) + " (" + LocationService.GetDirectionFromHeading(compassHeading) + ")", ((compassHeading + 180) % 360).toFixed(0) + " (" + LocationService.GetDirectionFromHeading((compassHeading + 180) % 360) + ")")
    }
  };
  window.addEventListener("deviceorientationabsolute", handleOrientation);
  setInterval(async () => {

    var result = await LocationService.SetCurrentLocation();
    if (result !== undefined) {
      updateLocation(result.Ref, result.Lat, result.Long)
    }

  }, 2500);


  return (
    <>      
      <Popup isOpen={showItasc} title="Weather" onClose={hideShowItaskForm}>
        <Weather />
      </Popup>
      <LocationInfo />
      <TopNav />
      <SummaryInfo />
      <NoteList />
      <GridRefCalc />
      <NavCalc />
    </>
  )
}

export default App