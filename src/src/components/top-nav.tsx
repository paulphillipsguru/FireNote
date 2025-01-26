import { HomeIcon, PlusIcon } from '@heroicons/react/20/solid'
import { useNoteStore, INoteStore } from '../state/note-state'


const TopNav = () => {  
    const currenteNote = useNoteStore((state: INoteStore)=> state.CurrentNote);
    const clearCurrentNote = useNoteStore((state: INoteStore)=> state.clearCurrentNote);
    const showCategory = useNoteStore((state: INoteStore)=> state.showCategory);
    return (<nav aria-label="Breadcrumb" className="flex mt-5 sticky top-5 mb-5">
        <ol role="list" className="flex space-x-4 rounded-md bg-white px-6 shadow h-14">
            <li className="flex" onClick={clearCurrentNote}>
                <div className="flex items-center">
                    <a href="#" className="text-gray-400 hover:text-gray-500">
                        <HomeIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0" />
                        <span className="sr-only">Home</span>
                    </a>
                </div>
            </li>
         
            {currenteNote.Id >0 ? (
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
                    <li key="AddNote" className="flex">

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
                                onClick={showCategory}
                                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                            >
                                <PlusIcon aria-hidden="true" className="-ml-1 -mr-0.5 h-5 w-5 text-gray-400" />
                            </a>
                        </div>
                    </li>
                </>

            ) : <></>}

        </ol>
    </nav>)

}

export default TopNav;