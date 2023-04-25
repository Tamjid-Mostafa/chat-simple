import React from 'react'
import Add from "../../assets/images/svg/Add.svg";
export default function AddChannelButton({ changeDashboardTab, dashboardTab }) {
  return (
    <div>
      <button className='flex items-center gap-2 bg-[#66B467] text-xs text-white px-4 py-2.5 rounded-full' onClick={() => changeDashboardTab(dashboardTab)}>
        <img src={Add} alt="" />
        Add Channel </button>
    </div>
  )
}