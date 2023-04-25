import React from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'

const BotTask = () => {
    return (
        <div className="border rounded-lg p-5 space-y-3 max-w-sm ">
            <h6>Bot task completion rate</h6>
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green rounded-full" />
                    <span className="text-xs text-gray-400">Achieved</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-100 rounded-full" />
                    <span className="text-xs text-gray-400"> Remaining</span>
                </div>
            </div>
            <div className="">
                <CircularProgressbar
                    text={`67%`}
                    value={67}
                    styles={buildStyles({
                        backgroundColor: "#66B467",
                        pathColor: "#66B467",
                        textColor: "#333",
                        textSize: "15px",
                    })}
                />
            </div>
        </div>
    )
}

export default BotTask