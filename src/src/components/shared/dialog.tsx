import {
    Dialog,
    DialogPanel,
    DialogBackdrop, DialogTitle
} from '@headlessui/react'

const Popup = (props: { children: any, title: string, isOpen: boolean, onClose?: any }) => {
    return (<>    
        <Dialog open={props.isOpen} onClose={() => { }} transition
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
                    <div className="mt-3 text-center sm:mt-5">
                        <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            {props.title}
                        </DialogTitle>
                    </div>
                    <div className="mt-2">
                        {props.children}
                    </div>

                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                            type="button"
                            data-autofocus
                            onClick={() => { if (props.onClose !== undefined) { props.onClose(); } }}
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >
                            Close
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>

    </>)
}

export default Popup;
