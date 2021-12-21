import { useState, Fragment } from 'react'
import { Menu } from '@headlessui/react'
import { motion } from 'framer-motion'

const Select = () => {
  return (
    <div className='relative'>
      <label>Indicator</label>
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button className='p-2 transition duration-150 ease-in-out rounded-full hover:bg-blue-100 hover:text-blue-500 focus:bg-blue-100 focus:text-blue-500 focus:outline-none'>Button</Menu.Button>
            {open && (
              <Menu.Items
                as={motion.div}
                static
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ duration: 0.15 }}
                className='absolute z-10 bg-black border rounded shadow focus:outline-none border-cool-gray-200'
              >
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`${active && 'bg-blue-500'}`}
                      href='/account-settings'
                    >
                      Documentation
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            )}
          </>
        )}
      </Menu>
    </div>
  )
}

export default Select
