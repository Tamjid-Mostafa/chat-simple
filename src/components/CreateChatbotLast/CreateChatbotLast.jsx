import React from 'react'
import "./CreateChatbotLast.css";
import CloseIcon from "../../assets/images/svg/Close.svg";
import MessageIcon from "../../assets/images/svg/Messages.svg";
import OutlineInput from '../../components/OutlineInput/OutlineInput';
import Spinner from '../Spinner';
export default function CreateChatbotLast({ changeChatbotTab }) {
    const [clicked, setClicked] = React.useState(false)
    const [fetchingResults, setFetchingResults] = React.useState(false)

    const fetchResults = () => {
        setFetchingResults(true)
        setFetchingResults(false)
        setClicked(true)
        // setTimeout(() => {
        //     setFetchingResults(false)
        //     setClicked(true)
        // }, 5000);
    }
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
                        {/* <header className='flex justify-between items-center'>
                            <h1>What will your chatbot do?</h1>
                            <img src={CloseIcon} alt="" />
                        </header>

                        <div className='flex w-full items-center gap-10 pr-4 pt-4 pb-8'>
                            <div className='message_first'>
                                <div className='flex items-center gap-3'>
                                    <img src={MessageIcon} alt="" />
                                    <h4 className='text-lg'>Create an FAQ</h4>
                                </div>
                            </div>
                            <div className='message_second'>
                                <div className='flex items-center gap-3'>
                                    <img src={MessageIcon} alt="" />
                                    <h4 className='text-lg'>Create a business small talk</h4>
                                </div>
                            </div>
                        </div> */}

                        <h1>
                            Build FAQ
                        </h1>
                        <p className='text-sm'>
                            ChatSimple uses technology to create FAQ automatically. Start generating a list of FAQ by inputing an <br /> URL where you would like answers to created from.
                        </p>

                        <div className='flex items-center gap-4 mt-3'>
                            <input type="text" className='border border-solid border-gray-400 outline-none py-3 pl-4 rounded-md text-sm' placeholder='https://www.example.com' />
                            <button className='text-sm text-white px-5 bg-[#66B467] py-2 rounded-full' onClick={fetchResults} >
                                {fetchingResults ? "Building" : "Build"}
                            </button>
                        </div>
                        <div className="flex flex-col">
                            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                    <div className="overflow-hidden">
                                        {!fetchingResults ? <table
                                            className="min-w-full border-t-4 border-solid mt-4 border-green-400 rounded-md text-center text-sm font-light border-l border-r border-l-gray-200 shadow border-r-black">
                                            <thead className="border-b font-medium border-gray-300">
                                                <tr className='bg-gray-100'>
                                                    <th
                                                        scope="col"

                                                        className="border-r w-20 px-6 py-4 border-gray-300">

                                                    </th>
                                                    <th
                                                        scope="col"

                                                        className="border-r px-6 py-8 text-center text-gray-300 border-gray-300">
                                                        A
                                                    </th>
                                                    <th
                                                        scope="col"

                                                        className="border-r px-6 text-center py-4 text-gray-300 border-gray-300">
                                                        B
                                                    </th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-b border-gray-300 bg-gray-100">
                                                    <td
                                                        className="whitespace-nowrap border-r px-6 py-4 font-medium border-gray-300">

                                                    </td>
                                                    <td
                                                        className="whitespace-nowrap border-r px-6 py-4 font-bold text-left border-gray-300">
                                                        Question
                                                    </td>
                                                    <td
                                                        className="whitespace-nowrap border-r px-6 py-4 font-bold text-left border-gray-300">
                                                        Answer
                                                    </td>

                                                </tr>
                                                <tr className="border-b border-gray-300" >
                                                    <td
                                                        className="whitespace-nowrap border-r px-6 py-4 font-medium border-gray-300">
                                                        1
                                                    </td>
                                                    <td
                                                        className=" border-r text-left px-6 py-4 border-gray-300">
                                                        {clicked ? "How can effect records?" : ""}
                                                    </td>
                                                    <td

                                                        className="whitespace-nowrap border-r text-left px-6 py-4 border-gray-300">
                                                        {clicked ? "Lorem ipsum dolor sit amet consectetur adipisicing elit." : ""}
                                                    </td>

                                                </tr>
                                                <tr className="border-b border-gray-300" colSpan="2">
                                                    <td
                                                        className="whitespace-nowrap border-r px-6 py-4 font-medium border-gray-300">
                                                        2
                                                    </td>
                                                    <td
                                                        className="whitespace-nowrap text-left border-r px-6 py-4 border-gray-300">
                                                        {clicked ? "Can I clean my records with soap and water?" : ""}
                                                    </td>
                                                    <td
                                                        className="whitespace-nowrap text-left border-r px-6 py-4 border-gray-300">
                                                        {clicked ? "Lorem ipsum dolor sit amet consectetur adipisicing elit." : ""}
                                                    </td>

                                                </tr>

                                            </tbody>
                                        </table> : <div className='spinner_wrapper_fetch'>
                                            <Spinner />
                                        </div>}
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center gap-3 mt-6'>
                                <button className='text-sm text-gray-600 border border-solid border-gray-300 px-6 py-2 rounded-full' onClick={() => changeChatbotTab(2)}>
                                    Back
                                </button>
                                <button className='text-sm text-white px-5 bg-[#66B467] py-2 rounded-full' onClick={() => changeChatbotTab(2)} >
                                    Next
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </>
    )
}
