import { useNoteStore, INoteStore } from '../state/note-state'
import FormEditor from './form-editor';
import {
    Dialog,
    DialogPanel,
    DialogBackdrop,
} from '@headlessui/react'
import { useLocationStore, ILocationStore } from '../state/location-state';
import { NoteCategories } from '../state/category-state';
const NoteCategory = () => {
    const showCategory = useNoteStore((state: INoteStore) => state.CategoryFormIsVisible);
    const currentCategory = useNoteStore((state: INoteStore) => state.CurrentCategory);
    const setCategory = useNoteStore((state: INoteStore) => state.setCategory);
    const closeCategory = useNoteStore((state: INoteStore) => state.closeCategory);
    const locationStore = useLocationStore((state: ILocationStore) => state);
    if (currentCategory === undefined) {
        return (<></>)
    }

    const addCategory = (category: any) => {
        setCategory(category, locationStore);
    }

    const classNames = (...classes: any[]) => {
        return classes.filter(Boolean).join(' ')
    }

    return (<>
        <Dialog
            transition
            className="relative z-10"
            open={showCategory}
            onClose={() => { }}
        >
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
                <DialogPanel
                    transition
                    className="mx-auto max-w-xl transform overflow-hidden  bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                >
                    {currentCategory.length === 0 ?
                        <ul role="list" className="w-full m-3  grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-1">
                            {NoteCategories.map((category: any) => (<>
                                <li key={category.Name} className="col-span-1 flex rounded-md shadow-sm mr-8">
                                    <div
                                        className={classNames(
                                            category.Bg,
                                            'flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white',
                                        )}
                                    >
                                        {category.Initials}
                                    </div>
                                    <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white" onClick={() => { addCategory(category) }}>
                                        <div className="flex-1 px-4 py-5 text-sm ">
                                            <h1>{category.Name}</h1>
                                        </div>
                                    </div>
                                </li>
                            </>))}

                        </ul>
                        : <>
                            <ul role="list" className="w-full m-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-1">
                                {currentCategory?.map((category: any) => (<>
                                    <li key={category.Name} className="col-span-1 flex rounded-md shadow-s mr-5">
                                        <div
                                            className={classNames(
                                                category.Bg,
                                                'flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white',
                                            )}
                                        >
                                            {category.Initials}
                                        </div>
                                        <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white" onClick={() => { addCategory(category) }}>
                                            <div className="flex-1 px-4 py-5 text-sm ">
                                                <h1>{category.Name}</h1>
                                            </div>

                                        </div>
                                    </li>
                                </>))}

                            </ul></>}

                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                            type="button"
                            data-autofocus
                            onClick={closeCategory}
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >
                            Close
                        </button>
                    </div>

                </DialogPanel>
            </div>
        </Dialog>
        <FormEditor />

    </>)
}

export default NoteCategory;