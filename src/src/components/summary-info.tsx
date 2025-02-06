import { PlusIcon } from '@heroicons/react/20/solid'
import { useNoteStore, INoteStore } from '../state/note-state'
import { Note } from '../types/note-Type';

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const SummaryInfo = () => {
  const notes = useNoteStore((state: INoteStore) => state.Notes);
  const addNote = useNoteStore((state: INoteStore) => state.addNote);
  const currentNote = useNoteStore((state: INoteStore) => state.CurrentNote);
  const setNote = useNoteStore((state: INoteStore) => state.setCurrent);
  const newRequest = () => {
    // To Do: Replace with a nicer UI / Prompt
    var newName = prompt("Enter a name");
    if (newName !== null) {
      addNote(newName);

      //TimeState.State.
    }
  }

  // if a note is currently selected then should should
  // not see the summary view
  if (currentNote !== undefined && currentNote.Id > 0) {
    return (<></>)
  }
  return (
    <>
      <div className="sticky top-5 mb-5 mt-1">
        <div aria-hidden="true" className="absolute inset-0 flex items-center pl-5">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <button
            type="button"
            onClick={() => { newRequest(); }}
            className="inline-flex items-center gap-x-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <PlusIcon aria-hidden="true" className="-ml-1 -mr-0.5 h-5 w-5 text-gray-400" />
          </button>
        
        </div>
      </div>

      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">

        {notes.map((summary: Note, actionIdx: number) => (
          <div onClick={() => { setNote(summary) }}
            key={summary.Id}
            className={classNames(
              actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
              actionIdx === 1 ? 'sm:rounded-tr-lg' : '',

              'group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500',
            )}
          >
            <div>
              <span className="inline-flex rounded-lg p-3 ring-4 ring-white"/>
            </div>
            <div>
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                <a href="#" className="focus:outline-none" >
                  <span aria-hidden="true" />
                  {summary.Name} - {summary.Date}
                </a>
              </h3>
            </div>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
            >
              <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
              </svg>
            </span>
          </div>
        ))}
      </div>
    </>)
}

export default SummaryInfo;