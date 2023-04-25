import React from 'react'
import Add from "../../assets/images/svg/Add.svg";
export default function BuildButton({onClick}) {
  return (
    <button className='flex items-center gap-2 bg-[#66B467] text-sm mt-4 text-white px-7 py-3 rounded-full' onClick={onClick}>
     <img src={Add} alt="" />
      Build
    </button>
  )
}