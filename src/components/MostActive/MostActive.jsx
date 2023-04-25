import React from 'react'
import ChartContainerIcon from "../../assets/images/svg/Chart.svg";
const MostActive = () => {
    return (
        <div className="border rounded-lg p-5 space-y-3 max-w-sm ">
            <h6>Most Active Account Types</h6>
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    <span className="text-xs text-gray-400">Very Active</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-100 rounded-full"></div>
                    <span className="text-xs text-gray-400"> Inactive</span>
                </div>
            </div>
            <div className="">
                <img className='' src={ChartContainerIcon} alt="" />
            </div>
        </div>
    )
}

export default MostActive