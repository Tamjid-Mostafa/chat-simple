import React from 'react'
import ChartMapIcon from '../../assets/images/svg/ChartMap.png'

const ActiveCountries = () => {
    return (
        <div className="border rounded-lg p-5 space-y-3 max-w-sm">
            <h6>Active Countries</h6>
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-400">Very Active</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-100 rounded-full"></div>
                    <span className="text-xs text-gray-400"> Active</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-100 rounded-full"></div>
                    <span className="text-xs text-gray-400"> Inactive</span>
                </div>
            </div>
            <div className="flex justify-center">
                <img src={ChartMapIcon} alt="" />
            </div>
        </div>
    )
}

export default ActiveCountries