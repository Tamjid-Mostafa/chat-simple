import React, { useState } from 'react'
import Cross from '../../icons/Cross'
import cn from 'clsx'
import s from './PopUp.module.css'

const PopUp = ({ isOpen, setIsOpen, children }) => {
    return (
        <div>
            {/* <!-- Main PopUp --> */}
            <div className={cn(s.root, "flex", !isOpen && "hidden")}>
                <div className={cn(s.container)}>
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white rounded-lg shadow-2xl">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-start justify-between p-4">
                            <h3 className="text-xl font-semibold text-gray-900">
                            </h3>
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                                <Cross />
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {children}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PopUp