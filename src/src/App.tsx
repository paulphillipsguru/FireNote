import './App.css'
import SummaryInfo from './components/summary-info';
import TopNav from './components/top-nav';
import NoteList from './components/note-list';
import LocationInfo from './components/location-info';
import LocationService from './services/location-service';
import { ILocationStore, useLocationStore } from './state/location-state';
import { useNoteStore, INoteStore } from './state/note-state';


const App = () => {
  const lat = useLocationStore((state: ILocationStore) => state.Lat);
  const long = useLocationStore((state: ILocationStore) => state.Long);
  const currentNote = useNoteStore((state: INoteStore) => state.CurrentNote.Id);
  const setHeading = useLocationStore((state: ILocationStore) => state.setHeadng);
  const updateLocation = useLocationStore((state: ILocationStore) => state.update);
  const clearCache = () => {
    if ('serviceWorker' in navigator) {
      caches.keys().then((names) => {
        names.forEach((name) => caches.delete(name));
      });
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister();
        });
      });
    }
  }
  const handleOrientation = async (event: DeviceOrientationEvent) => {
    if (event.absolute && event.alpha !== null) {
      const compassHeading = 360 - event.alpha;
      setHeading(compassHeading.toFixed(0) + " (" + LocationService.GetDirectionFromHeading(compassHeading) + ")", ((compassHeading + 180) % 360).toFixed(0) + " (" + LocationService.GetDirectionFromHeading((compassHeading + 180) % 360) + ")")


    }
  };
  window.addEventListener("deviceorientationabsolute", handleOrientation);
  setInterval(async () => {

    var result = await LocationService.SetCurrentLocation(lat, long, window.navigator.onLine);
    if (result !== undefined) {
      updateLocation(result.Ref, result.Lat, result.Long, result.Location)
    }
  }, 2500);
  

  return (
    <>
      <LocationInfo />
      <TopNav />
      <SummaryInfo />
      <NoteList />
      
    {currentNote > 0 ? (
      <></>) : <button
      type="button"
      data-autofocus
      onClick={clearCache}
      className="rounded-md mt-5 bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500  focus-visible:outline-offset-2 focus-visible:outline-indigo-6006"
    >
      Refresh
    </button>}
    </>
  )
}

export default App