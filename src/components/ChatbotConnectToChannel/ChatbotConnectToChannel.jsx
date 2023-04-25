import React from 'react'
import "./ChatbotConnectToChannel.css";
import MenuIcon from "../../assets/images/svg/Menu.svg";
import SearchIcon from "../../assets/images/svg/Seach.svg";
import ThreeAvatarTwo from "../../assets/images/Others/3d_avatar_8.png";
import ThreeAvatarOne from "../../assets/images/Others/3d_avatar_1.png";
export default function ChatbotConnectToChannel({changeChatbotTab}) {
    return (
        <>
            <main className='chat__bot__connect__channel__main'>
                <div className="chat__bot__connect__channel__container">
                    <h1>
                        Chatbot
                    </h1>
                    {/* <p>
                    0 custom chatbots
                    </p> */}

                    <div className='chat__bot__contect__message'>
                        <div className='flex flex-row w-full'>
                            <div className='message_side'>
                                <div className='search__messages'>
                                    <div className='flex justify-between items-center'>
                                        <img src={MenuIcon} alt="" />
                                        <input type="text" placeholder='Hinted search text' className='w-40 bg-transparent outline-none text-sm pl-2 placeholder:text-black' />
                                        <img src={SearchIcon} alt="" />
                                    </div>
                                </div>

                                <div className='user__list__messages'>
                                    <ul className='mt-4'>
                                        <li className='flex items-center text-sm gap-3 p-2 border-b border-solid border-gray-100'>
                                            <img src={ThreeAvatarOne} alt="" />
                                            Judy Lawrence
                                        </li>
                                        <li className='flex items-center mt-3 text-sm gap-3 p-2 border-b border-solid border-gray-100'>
                                            <img src={ThreeAvatarTwo} alt="" />
                                            Matt Cha
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className='middle_side__content border-r border-solid border-gray-100'>
                                <div className='flex justify-center mt-3'>
                                    <div className='text-sm text-gray-300 border border-solid border-gray-300 px-6 py-2 rounded-full'>
                                        March 27, 2023
                                    </div>
                                </div>
                                <div className='messages__details'>
                                    <div className='flex items-center gap-3'>
                                        <img src={ThreeAvatarOne} alt="" />
                                        <div className='bg-black text-white p-2 text-sm px-4 rounded-tr-full rounded-br-full rounded-bl-full'>
                                            You could, but we don’t recommend it.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='right__side p-6 w-52 relative overflow-hidden'>
                                <div className="flex justify-center">
                                    <h4 className='text-center text-xl'>Looks all set!</h4>
                                </div>
                                <div className='absolute bottom-28'>
                                    <div className='flex flex-col items-start gap-4'>
                                        <button className='text-sm text-gray-600 border border-solid border-gray-300 px-6 py-2 rounded-full' onClick={()=>changeChatbotTab(5)}>
                                            Save and close
                                        </button>
                                        <button className='text-sm text-white px-5 bg-[#66B467] py-2 rounded-full' onClick={()=>changeChatbotTab(5)}>
                                            Publish
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
