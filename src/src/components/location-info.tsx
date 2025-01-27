import { ILocationStore, useLocationStore } from "../state/location-state"
const LocationInfo = () => {
  const locationInfo = useLocationStore((location: ILocationStore) => location);
  return (<>
    <div>
      <dl className="grid gap-2 grid-cols-2">
        <div className="overflow-hidden rounded-lg bg-gray-900 shadow">

          <dd className="p-4 text-4xl text-white">
            {locationInfo.Ref}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-gray-900 shadow">
          <dd className="p-3 text-3xl text-teal-600">
            {locationInfo.Heading}
          </dd>
          <hr />
          <dd className="p-3 text-3xl text-red-600">
            {locationInfo.OpsHeading}
          </dd>
        </div>
      </dl>
      <p className="text-left text-sm mt-2">{locationInfo.Address}</p>
    </div>
  </>)
}

export default LocationInfo