import { useState } from 'react'
import { Dialog, DialogPanel, DialogTitle,Input  } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { INoteStore, useNoteStore } from '../state/note-state'
import { useLocationStore,ILocationStore } from '../state/location-state'
import { GridRefCalculator } from '../lib/gridRefCalculator'

const GridRefCalc = () => {
    const show = useNoteStore((state: INoteStore) => state.ShowGridCalc);
    const showHide = useNoteStore((state: INoteStore) => state.showGridCalc);
    const locationInfo = useLocationStore((location: ILocationStore) => location);
    const [dist, setDist] = useState(0);
    return (<>
     <Dialog open={show} onClose={() => { }} className="relative z-10">
      <div className="fixed inset-0" />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-base font-semibold leading-6 text-gray-900">Grid Calculator</DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={showHide}
                        className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  <div className="h-full overflow-y-auto bg-white p-8">
                    <div className="space-y-6 pb-16">
                      <div>                        
                        <dl className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
                          <div className="flex justify-between py-3 text-sm font-medium">
                            <dt className="text-gray-500">Current</dt>
                            <dd className="text-gray-900">{locationInfo.Ref}</dd>
                          </div>                                                                          
                          <div className="flex justify-between py-3 text-sm font-medium">
                            <dt className="text-gray-500">Heading</dt>
                            <dd className="text-gray-900">{locationInfo.Deg.toFixed(0)}</dd>
                          </div>                          
                          <div className="flex justify-between py-3 text-sm font-medium">
                            <dt className="text-gray-500">Distance</dt>
                            <dd className="text-gray-900 float-right"><Input type="number" className="w-32 border " onChange={(e: any)=> setDist(e.target.value)} data-focus data-hover/></dd>
                          </div>                          
                          <div className="flex justify-between py-3 text-sm font-medium">
                            <dt className="text-gray-500">New Reference</dt>
                            <dd className="text-gray-900">{GridRefCalculator.moveByDistance(locationInfo.Ref,locationInfo.Deg,dist)}</dd>
                          </div>                                                                          
                        </dl>
                      </div>
                      
                      <div className="flex">
                        <button
                          type="button"
                          onClick={showHide}
                          className="ml-3 flex-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
    </>)
}

export default GridRefCalc;