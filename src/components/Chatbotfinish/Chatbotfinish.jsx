import React, { useState } from 'react'
import "./Chatbotfinish.css";
import BuildButton from '../Buttons/BuildButton';
import MessengerLogo from "../../assets/images/svg/messenger.svg";
import MoreImageLogo from "../../assets/images/svg/More.svg";
import MediaImage from "../../assets/images/Others/media.png";
export default function Chatbotfinish({changeChatbotTab}) {

    const [showhide, setshowhide] = useState(false);
    const [turnedoff, setturnedoff] = useState(false);

    function showHideOptionMenu() {
        setshowhide(!showhide);
    }
    return (
        <>
            <main className='chat__box__finish__main'>
                <div className="chat__box_container">
                    <h1>
                        Chatbot
                    </h1>
                    {/* <p>
                    0 custom chatbots
                    </p> */}
                    <BuildButton onClick = {()=>changeChatbotTab(6)} />

                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg mt-10 relative">
                        <div className='flex justify-between items-center p-3'>
                            <div className='flex items-center gap-4'>
                                <img src={MessengerLogo} alt="" />
                                <div className='flex flex-col'>
                                    <h1 className='text-sm'>FAQ bot</h1>
                                    <p>
                                        Messenger
                                    </p>
                                </div>
                            </div>
                            <button onClick={showHideOptionMenu} className='w-10 h-10 hover:bg-gray-100 rounded-full flex justify-center items-center'>
                                <img src={MoreImageLogo} alt="" />
                            </button>
                            {showhide ? 
                            <div className='md:w-[72px] bg-white p-0 absolute flex flex-col right-4 top-16 border border-solid border-gray-300 rounded'>
                                <span className='text-sm cursor-pointer p-2'>Edit</span>
                                <div className='border-t border-solid border-gray-100'></div>
                                <span className='text-sm cursor-pointer p-2'>Delete</span>
                            </div> : null }
                        </div>
                        <img className='w-full' src={MediaImage} alt="" />
                        <div className="p-5">
                            <h5 className="mb-1 text-xl font-medium tracking-tight text-gray-900">General FAQ</h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                8 questions
                            </p>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                            <div className='flex justify-end'>
                                {!turnedoff ? <button className="inline-flex items-center px-6 py-2 border border-solid border-red-500 rounded-full text-sm font-medium text-center bg-red-500 text-white" onClick={()=> setturnedoff(true)}>
                                    Turn Off
                                </button> : <button className="inline-flex items-center px-6 py-2 border border-solid border-gray-500 rounded-full text-sm font-medium text-center">
                                    Turned Off
                                </button>}
                            </div>

                        </div>
                    </div>

                </div>
            </main>
        </>
    )
}
