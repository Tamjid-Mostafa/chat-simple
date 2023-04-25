import React, { useState } from 'react'
import facebook from "../../assets/images/svg/messenger.svg";
import instagram from "../../assets/images/svg/instagram.png";
import whatsapp from "../../assets/images/svg/WhatsApp.svg";


const AddChannel = ({channelHandler,setIsOpen}) => {

const channelData = [
    {
        name: 'Messenger',
        icon: facebook,
        slug: 'MESSENGER'
    },
    {
        name: 'Instagram',
        icon: instagram,
        slug: 'INSTAGRAM'
    },
    {
        name: 'Whats App',
        icon: whatsapp,
        slug: 'WHATS APP'
    },
];
const AddChannelButton = (slug) => {
    channelHandler(slug);
    setIsOpen(false);
}

    return (
        <div className='w-full p-[51px]'>
            {/* <!-- Modal body --> */}
            <div className="p-6 space-y-6 text-center">
                <h3 className='text-xl font-bold'>Add Channel</h3>
                <p>Deploy your chatbot to where your customers are.</p>
            </div>
            <div>
                
                {
                    channelData.map((item, i)=> 
                    <div key={i} className='flex items-center justify-between w-full border-b py-4'>
                    <div className='flex items-center gap-5'>
                        <img src={item.icon} alt="" className='w-12 h-12' />
                        <p>{item.name}</p>
                    </div>
                    <button
                    onClick={() =>AddChannelButton(item.slug)}
                    className='flex items-center gap-2 bg-[#66B467] text-xs text-white px-4 py-2.5 rounded-full'>
                        Add Channel </button>
                </div>
                    )
                }
            </div>
        </div>
    )
}

export default AddChannel