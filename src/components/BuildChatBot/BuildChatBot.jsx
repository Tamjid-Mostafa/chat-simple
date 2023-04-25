import { Switch, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const BuildChatbot = () => {
    const [chatbotTab, setChatbotTab] = React.useState(2)
    const { loading, user: userData} = useSelector((state)=> {
        return state.auth
      })
      useEffect(()=> {
        if(!loading && !userData) {
          // window.alert("Please login to continue")
        } else{
        }
      }, [userData, loading])
    const changeChatbotTab = (tab) => {
        setChatbotTab(tab)
    }
  return (
    <div className='display_flex'>
        <div className=''>
                <div className='chatbot_header_top'>
                    <h2 className='bold_text'>Chatbot</h2>
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={''}
                    />
                </div>

                <div>
                    <h2 className='bold_text'>Select Chatbot Expertise</h2>

                    <div className='expertise_box display_flex'>
                        <div onClick={() => changeChatbotTab(3)} className='faq_text cursor-pointer'>
                            <p> FAQ</p>
                        </div>
                        <div className='chatbot_toggle_button'>
                            <Switch
                            onClick={() => changeChatbotTab(3)} />
                        </div>
                    </div>

                    <div className='expertise_box display_flex'>
                        <div onClick={() => changeChatbotTab(4)} className='faq_text cursor-pointer'>
                            <p> Business small talk</p>
                        </div>
                        <div className='chatbot_toggle_button2'>
                            <Switch onClick={() => changeChatbotTab(4)} />
                        </div>
                    </div>

                    <div className='expertise_box display_flex'>
                        <div className='faq_text'>
                            <p>Business Goal</p>
                        </div>
                        <div className='chatbot_toggle_button3'>
                            <Switch />
                        </div>
                    </div>

                </div>

            </div >
         {chatbotTab === 3 && <Chatbot_faq_details changeChatbotTab={changeChatbotTab} user = {userData} />}
            {chatbotTab === 4 && <Chatbot_business_talk changeChatbotTab={changeChatbotTab} user = {userData} />}
            {chatbotTab === 5 && <Chatbot_business_goal changeChatbotTab={changeChatbotTab} user = {userData} />}
            {chatbotTab === 7 && <Chatbotfinish changeChatbotTab={changeChatbotTab} user = {userData} />}
            {chatbotTab === 8 && <CreateChatbotLast changeChatbotTab={changeChatbotTab} user = {userData} />}
    </div>
  )
}

export default BuildChatbot