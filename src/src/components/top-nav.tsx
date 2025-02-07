import { HomeIcon, PlusIcon, InformationCircleIcon, CalculatorIcon, ViewfinderCircleIcon } from '@heroicons/react/20/solid'
import { useNoteStore, INoteStore } from '../state/note-state'
import StaticInfo from './static-info';
import LocationService from '../services/location-service';
import { ILocationStore, useLocationStore } from '../state/location-state';

const TopNav = () => {
    const currenteNote = useNoteStore((state: INoteStore) => state.CurrentNote);
    const clearCurrentNote = useNoteStore((state: INoteStore) => state.clearCurrentNote);
    const showCategory = useNoteStore((state: INoteStore) => state.showCategory);
    const showInfo = useNoteStore((state: INoteStore) => state.showInfo);
    const showGridCalc = useNoteStore((state: INoteStore) => state.showGridCalc);
    const showNavCalc = useNoteStore((state: INoteStore) => state.showNavCalc);
    const updateAddress = useLocationStore((state: ILocationStore) => state.setAddress);
    const refreshLocation = async () => {
        updateAddress("SEARCHING....");
        var result = await LocationService.SetCurrentLocation();
        if (result !== undefined) {
            var address = await LocationService.FindAddress(result.Lat, result.Long);
            if (address !== undefined) {
                updateAddress(address + " [" + result.Ref + "]");
            } else {
                updateAddress("ADDRESS NOT FOUND");
            }
        } else {
            updateAddress("ADDRESS NOT FOUND");
        }
    }
    return (
        <>
            <nav aria-label="Breadcrumb" className="flex mt-5  top-5 mb-5">
                <ol role="list" className="flex space-x-4 rounded-md bg-white px-6 shadow h-14">
                    <li className="flex" onClick={clearCurrentNote}>
                        <div className="flex items-center">
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <HomeIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0" />
                                <span className="sr-only">Home</span>
                            </a>
                        </div>
                    </li>
                    {currenteNote.Id > 0 ? (
                        <>
                            <li key="Current" className="flex">
                                <div className="flex items-center">
                                    <svg
                                        fill="currentColor"
                                        viewBox="0 0 24 44"
                                        preserveAspectRatio="none"
                                        aria-hidden="true"
                                        className="h-full w-6 flex-shrink-0 text-gray-200"
                                    >
                                        <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                                    </svg>
                                    <a
                                        href="#"
                                        className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                                    >
                                        {currenteNote.Name}
                                    </a>
                                </div>
                            </li>
                        </>
                    ) : <></>}

                </ol> <StaticInfo />
            </nav>

            {currenteNote.Id > 0 ? (<>
                <span className="isolate flex mb-5 p-1">
                    <button type="button" onClick={showCategory}
                        className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                    >
                        <PlusIcon aria-hidden="true" className="-ml-1 mr-0.5 h-5 w-5 text-gray-400" />ADD
                    </button>
                    <button type="button" onClick={showInfo}
                        className="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
                        <InformationCircleIcon aria-hidden="true" className="-ml-1 mr-0.5 h-5 w-5 text-gray-400" />INFO
                    </button></span></>)
                : <></>}
                <span className="isolate flex mb-5 p-1">
            <button type="button" onClick={showGridCalc}
                className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
                <CalculatorIcon aria-hidden="true" className="-ml-1 mr-0.5 h-5 w-5 text-gray-400" />GRID
            </button>
            <button type="button" onClick={showNavCalc}
                className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
                <ViewfinderCircleIcon aria-hidden="true" className="-ml-1 mr-0.5 h-5 w-5 text-gray-400" />NAV
            </button>
            <button type="button" onClick={refreshLocation}
                className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
                <ViewfinderCircleIcon aria-hidden="true" className="-ml-1 mr-0.5 h-5 w-5 text-gray-400" />GET ADDRESS
            </button>
        </span ></>)
}

export default TopNav;