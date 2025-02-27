import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { Button, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useNoteStore, INoteStore } from '../state/note-state'
import { NoteEntry } from '../types/note-Type';
import FormEditor from './form-editor';
import NoteCategory from './category-form';

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

const NoteList = () => {
    const currentNote = useNoteStore((state: INoteStore) => state.CurrentNote);
    const selectForm = useNoteStore((state: INoteStore) => state.selectForm);
    const deleteEntry = useNoteStore((state: INoteStore) => state.deleteEntry);
    const deleteAllNotes = useNoteStore((state: INoteStore) => state.deleteAllNotes);    
    if (currentNote === undefined || currentNote.Enteries === undefined) {
        return (<><NoteCategory />
        </>);
    }

    const deleteRequest = (noteEntry: NoteEntry) => {
        if (confirm("Delete '" + noteEntry.Name + "'?")) {
            deleteEntry(noteEntry);
        }
    }

    const deleteAll = () => {
        // To do: Replace with better UI, will
        // replace with a nicer version.
        if (confirm("Delete all?")) {
            deleteAllNotes();
        }
    }

    return (
        <>
          
            <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
                {currentNote.Enteries.map((noteEntry: NoteEntry) => (
                    <li key={noteEntry.Id} className="overflow-hidden rounded-xl border border-gray-200" onDoubleClick={() => { selectForm(noteEntry) }}>
                        <div className={classNames("flex items-center gap-x-4 border-b border-gray-900/5 p-6", noteEntry.BackgroundIcon)}>

                            <div className="text-sm font-medium leading-6 text-white uppercase">{noteEntry.Title}</div>
                            <Menu as="div" className="relative ml-auto">
                                <MenuButton className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">Open options</span>
                                    <EllipsisHorizontalIcon aria-hidden="true" className="h-5 w-5" />
                                </MenuButton>
                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                                    {noteEntry.Form.length > 0 ? <MenuItem>
                                        <a href="#" className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50" onClick={() => { selectForm(noteEntry) }}>
                                            Edit
                                        </a>
                                    </MenuItem> : <></>}
                                    <MenuItem>
                                        <a href="#" className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50" onClick={() => { deleteRequest(noteEntry) }}>
                                            Delete
                                        </a>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </div>

                        <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">

                            <div className="flex justify-between gap-x-4 py-3">
                                <dd className="text-gray-700 font-bold uppercase">
                                    <time dateTime={noteEntry.Date}>{noteEntry.Date} </time>
                                </dd>
                            </div>
                            {noteEntry.Form.map((f: any) => (<div className="flex justify-between gap-x-4 py-3">
                                <dt className="text-gray-500">{f.Title}</dt>
                                <dd className="flex items-start gap-x-2">
                                    <div className="font-medium text-gray-900">{f.Value}</div>
                                </dd>
                            </div>))}
                            <div className="flex justify-between gap-x-4 py-3">
                                <dt className="text-gray-500">Lat / Long</dt>
                                <dd className="flex items-start gap-x-2">
                                    <div className="font-medium text-gray-900">{noteEntry.Lat} / {noteEntry.Long} </div>
                                </dd>
                            </div>
                            <div className="flex justify-between gap-x-4 py-3">
                                <dt className="text-gray-500">Grid / Heading</dt>
                                <dd className="flex items-start gap-x-2">
                                    <div className="font-medium text-gray-900">{noteEntry.Ref} / {noteEntry.Heading}  </div>
                                </dd>
                            </div>                          

                        </dl>
                    </li>
                ))}
                <li>

                </li>
            </ul>
            <div className='mt-10'>
                <Button className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => deleteAll()}>Delete All?</Button>
            </div>

            <FormEditor />
            <NoteCategory />
            
           
        </>
    )
}

export default NoteList;