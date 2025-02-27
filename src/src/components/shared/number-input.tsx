import { Input } from '@headlessui/react'
const NumberInput = (props:{title:string, value: number, onChange: any}) => {
    return (<>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {props.title}</label>
        <Input type="number" data-focus data-hover id="number-input"  onContextMenu={(e) => e.preventDefault()}  onFocus={(e) => e.target.select()}   value={props.value} onChange={(obj: any) => {  props.onChange(obj.target.value) }}
         aria-describedby="helper-text-explanation" 
         className="data-[hover]:shadow data-[focus]:bg-blue-100 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="90210" /></>)
}

export default NumberInput;