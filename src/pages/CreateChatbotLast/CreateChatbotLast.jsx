import React from 'react'
import "./CreateChatbotLast.css";
import CloseIcon from "../../assets/images/svg/Close.svg";
import MessageIcon from "../../assets/images/svg/Messages.svg";
import OutlineInput from '../../components/OutlineInput/OutlineInput';
export default function CreateChatbotLast() {
    return (
        <>
            <main className='create__chat__bot_last'>
                <div className='create__chat_bot_container'>
                    <h1>
                        Chatbot
                    </h1>
                    {/* <h6>
                        0 custom chatbots
                    </h6> */}

                    <div className='chat__create__Last__box'>
                        <header className='flex justify-between items-center'>
                            <h1> What are your chatbots capibilities?</h1>
                            <img src={CloseIcon} alt="" />
                        </header>

                        <div className='flex w-full items-center gap-10 pr-4 pt-4 pb-8'>
                            <div className='message_first'>
                                <div className='flex items-center gap-3'>
                                    <img src={MessageIcon} alt="" />
                                    <h4 className='text-lg'>Answer FAQ questions</h4>
                                </div>
                            </div>
                            <div className='message_second'>
                                <div className='flex items-center gap-3'>
                                    <img src={MessageIcon} alt="" />
                                    <h4 className='text-lg'>Create a business small talk</h4>
                                </div>
                            </div>
                        </div>

                        <h1>
                            Build FAQ
                        </h1>
                        <p className='text-sm'>
                            ChatSimple uses technology to create FAQ automatically. Start generating a list of FAQ by inputing an <br /> URL where you would like answers to created from.
                        </p>

                    </div>
                </div>
            </main>
        </>
    )
}
