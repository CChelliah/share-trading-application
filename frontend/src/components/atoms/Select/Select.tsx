import React, {FC, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ISelect}  from 'ts/interfaces/ISelect'


const Select:FC<ISelect> = ( { selectedValue = 'MACD', getSelected, id }) => {
  const indicators = ['MACD', 'OBV', 'Stoch_Fastk']
  const [selected, setSelected] = useState(selectedValue)
  const updateSelected = (selected: any) => {
    setSelected(selected)
    getSelected(selected, id)
  }
  useEffect(() => {
  }, [selected])
  return (
    <div className='flex flex-1 items-center justify-center overflow-visible z-50 opacity-100'>
      <div className='flex-1 relative inline-block text-left h-full overflow-visible z-50 opacity-100'>
        <Listbox value={selected} onChange={e => updateSelected(e)}>
          {({ open }) => (
            <>
              <span className='rounded-md shadow-sm'>
                <Listbox.Button className='flex flex-1 h-full inline-flex justify-center w-full py-2 text-sm font-medium leading-5 text-blue-600 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-gray-50 active:text-blue-600 items-center p-6 overflow-visible z-50 opacity-100'>
                  <span className='text-blue-600'>{selected}</span>
                  <svg
                    className='w-5 h-5 ml-2 -mr-1'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                </Listbox.Button>
              </span>

              <Transition
                show={open}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Listbox.Options
                  static
                  className='z-50 opacity-100 opacity-100 absolute w-full mt-2 origin-top-right bg-white border border-gray-400 divide-y divide-gray-400 rounded-md shadow-lg outline-none overflow-visible'
                >
                  {indicators.map((opt) => (
                    <Listbox.Option className='text-center font-bold p-1'
                      key={opt}
                      value={opt}
                    >
                      {opt}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </>
          )}
        </Listbox>
      </div>
    </div>
  )
}

export default Select
