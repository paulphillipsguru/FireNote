import { useNoteStore, INoteStore } from '../state/note-state'
import { Note } from '../types/note-Type';
import {
    Dialog,
    DialogPanel,
    DialogBackdrop,
} from '@headlessui/react'
const FormEditor = () => {
    const currentForm = useNoteStore((state: INoteStore) => state.CurrentForm) as any[];
    const currentNote = useNoteStore((state: INoteStore) => state.CurrentNote) as Note;
    const hideForm = useNoteStore((state: INoteStore) => state.hideForm);
    const updateForm = useNoteStore((state: INoteStore) => state.updateForm);

    if (currentForm.length === 0) {
        return (<></>)
    }

    return (<>
        <Dialog open={true} onClose={() => { }} transition
            className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
                <DialogPanel
                    transition
                    className="mx-auto max-w-xl transform overflow-hidden  bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                >
                    <form className="w-full m-3 grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-6 lg:grid-cols-1">
                        <div>
                            <div className="border-b border-gray-900/10 pb-1">
                                <h2 className="text-base/7 font-semibold text-gray-900">{currentNote.Name}</h2>
                            </div>
                        </div>

                        {currentForm.map((r: any) => (<>
                            <div className="col-span-full">
                                <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
                                    {r.Title}
                                </label>
                                <div className="mr-7">
                                    <textarea
                                        rows={1}
                                        onChange={(obj: any) => { r.Value = obj.target.value; updateForm(r) }}
                                        className="block w-full rounded-md bg-white  px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        defaultValue={r.Value}
                                    />
                                </div>

                            </div>
                        </>))}


                    </form>

                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                            type="button"
                            data-autofocus
                            onClick={hideForm}
                            className="mt-3 inline-flex w-full bg-green-800 justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                        >
                            Close
                        </button>
                    </div>
                </DialogPanel>
            </div>

        </Dialog>
    </>)
}

export default FormEditor;
