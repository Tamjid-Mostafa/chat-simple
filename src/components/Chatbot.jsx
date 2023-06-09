import React, { useEffect, useState } from 'react';
import Chatbot_tab_1 from './chatbot-tabs/Chatbot_tab_1';
import Chatbot_tab_2_new from './chatbot-tabs/Chatbot_tab_2_new';
import Chatbot_faq_details from './chatbot-tabs/Chatbot_faq_details';
import Chatbot_business_talk from './chatbot-tabs/Chatbot_business_talk';
import Chatbot_business_goal from './chatbot-tabs/Chatbot_business_goal';
import { ChatbotEscalation } from './chatbot-tabs/ChatbotEscalation';
import Chatbotfinish from './Chatbotfinish/Chatbotfinish';
import CreateChatbotLast from './CreateChatbotLast/CreateChatbotLast';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import messenger from '../assets/images/svg/messenger.svg'
import instagram from '../assets/images/svg/instagram.png'
import Topbar from './Topbar/Topbar';
import ListItem from './ui/ListItem';
import LogoListItem from './ui/LogoListItem/LogoListItem';
import FAQ from './FAQ/FAQ.';
import { createChatbot, createChatBot, getChatbot, updateChatbot, updateChatBot } from '../redux/reducers/chatbotSlice';
import { useSnackbar } from './ui/MySnackbar/useSnakeBar';

const Chatbot = () => {
  const { showSnackbar } = useSnackbar();
  const [chatbotTab, setChatbotTab] = React.useState(1);
  const { loading, user: userData } = useSelector((state) => {
    return state.auth;
  });
  useEffect(() => {
    if (!loading && !userData) {
      // window.alert("Please login to continue")
    } else {
    }
  }, [userData, loading]);
  const changeChatbotTab = (tab) => {

    setChatbotTab(tab);
  };
  const backChatbotTab = () => {
    if (chatbotTab > 1) {
      setChatbotTab(chatbotTab - 1);
    }
  };

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { chatbots } = useSelector((state) => state.chatbot); // this has all the chat-bots list for a user that is logged in
  

  

  const [isChecked, setIsChecked] = useState(false)
  const [expertiseLength, setExpertiseLength] = useState(null)
// console.log(expertiseLength)

  const [isTyping, setIsTyping] = useState(false);
  const [chatbotTitle, setChatbotTitle] = useState('');
  const [prevTitle, setPrevTitle] = useState('');
  const [chatbotID, setChatbotID] = useState('');
  const [isChatbot, setISChatbot] = useState();

  const [platforms, setPlatforms] = useState([]);
  const [expertises, setExpertises] = useState([]);


  useEffect(() => {
    if (!chatbotID || chatbotID === "" || !user.user_id) return;
    if (chatbotID && user.user_id) {
      dispatch(getChatbot({ userID: user.user_id, chatbotID }));
    }
  }, [chatbotID, user.user_id]);

  // const [chatbot, setChatbot] = useState({})

  // useEffect(() => {
  //   setPrevTitle(chatbotTitle);
  // }, [chatbotTitle])

  // const { chatbot } = useSelector((state) => state.chatbot)
  // console.log(chatbot?.expertises?.length)
  // useEffect(() => {
  //   if (!chatbotID || chatbotID === "" || !user.user_id && chatbot) return;
  //   if (chatbotID && user.user_id) {
  //     setISChatbot(chatbot)
  //   }
  // }, [chatbotID, user.user_id, chatbot]);


  //  useEffect(() => {
  //   if (!chatbotID || chatbotID === "" || !user.user_id && chatbot?.expertises?.length === 0) return;
  //   if (isChatbot && isChatbot.expertises && isChatbot.expertises.length > 0) {
  //     const updatedExpertises = isChatbot.expertises.reduce((acc, expertise) => {
  //       if (expertise.expertise_type === 'ExpertiseType.FAQ') {
  //         return [...acc, 3];
  //       } else if (expertise.expertise_type === 'ExpertiseType.BUSINESS_SMALL_TALK') {
  //         return [...acc, 4];
  //       } else if (expertise.expertise_type === 'ExpertiseType.FREE_FORM') {
  //         return [...acc, 5];
  //       }
  //       return acc;
  //     }, []);
  
  //     setExpertises(updatedExpertises);
  //   }
  // }, [chatbotID, user.user_id, isChatbot]);






  const listItemsData =
  {
    channels: [
      {
        name: 'Messenger',
        img: messenger,
        slug: 'messenger'
      },
      {
        name: 'Instagram',
        img: instagram,
        slug: 'instagram'
      },
    ],
    chatBotExpertise: [
      {
        id: 3,
        name: 'FAQs',
        checked: isChecked,
      },
      {
        id: 4,
        name: 'Company Specific Talk',
        checked: isChecked,
      },
      {
        id: 5,
        name: 'Industry Expert',
        checked: isChecked,
      },
      {
        id: 6,
        name: 'Escalation',
        checked: isChecked,
      },
    ],

  }


  const CreateChatbot = () => {
    const data = {
      userID: user?.user_id,
      chatbotDetail: {
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        platforms: null,
        chatbot_title: chatbotTitle,
      },
      chatbotID: uuidv4(),
    };
    setChatbotID(data.chatbotID);
    dispatch(createChatbot(data))
      .then(() => {
        showSnackbar('Created Successfully', 'success')
      })
      .catch((error) => {
        console.error('Error handling delete:', error);
      });
  }

  const UpdateChatbot = () => {
    setPrevTitle(chatbotTitle);
    // update here
    const data = {
      userID: user?.user_id,
      update: { chatbot_title: chatbotTitle },
      chatbotID: chatbotID,
      update_mask: 'chatbot_title',
    };
    dispatch(updateChatbot(data))
      .then(() => {
        showSnackbar('Updated Successfully', 'success')
      })
      .catch((error) => {
        console.error('Error handling delete:', error);
      });

  }


  const handleExpertise = (id) => {
    if (!chatbotID) {
      showSnackbar('Create chatbot name', 'error')
      return;
    }
    changeChatbotTab(id)
    if (expertises.includes(id)) {
      setExpertises(expertises.filter(expertiseId => expertiseId !== id));
    } else {
      setExpertises([...expertises, id]);
    }
  }


  const handlePlatform = (value) => {
    let copyPlatform = platforms;

    if (!chatbotID) {
      showSnackbar('Create chatbot name', 'error')
      return;
    }

    if (value === 'messenger') {
      if (platforms.includes(value)) {
        copyPlatform = copyPlatform.filter((pf) => pf !== value);
        setPlatforms(copyPlatform);
      } else {
        copyPlatform = [...platforms, value];
        setPlatforms([...platforms, value]);
      }
    }
    if (value === 'instagram') {
      if (platforms.includes(value)) {
        copyPlatform = copyPlatform.filter((pf) => pf !== value);

        setPlatforms(copyPlatform);
      } else {
        copyPlatform = [...platforms, value];
        setPlatforms([...platforms, value]);
      }
    }

    const data = {
      userID: user?.user_id,
      update: {
        platforms:
          copyPlatform?.length === 0
            ? null
            : { first: copyPlatform[0], second: copyPlatform[1] },
      },
      chatbotID: chatbotID,
      update_mask: 'platforms',
    };

    dispatch(updateChatbot(data));
  };



  const handleBlur = () => {
    if (chatbotID !== '') {
      return UpdateChatbot()
    }
    return CreateChatbot()
  };

  const handleFocus = () => {
    setIsTyping(true);
  };

  return (
    <>
      <div className='w-full relative'>
        {chatbotTab === 1 && (
          <Chatbot_tab_1
          setExpertiseLength={setExpertiseLength}
            changeChatbotTab={changeChatbotTab}
            user={userData}
            setChatbotTitle={setChatbotTitle}
            chatbotTitle={chatbotTitle}
            setChatbotID={setChatbotID}
          />
        )}
        <div className={`w-full sticky top-0 z-10 ${chatbotTab !== 1 ? '' : 'hidden'}`}>
          <Topbar backChatbotTab={backChatbotTab} />
        </div>
        <div className='flex'>
          <div className={`${chatbotTab !== 1 ? 'relative' : 'hidden'}`}>

            <div className='p-5 min-h-screen bg-[#eeefee] fixed'>
              <div className='chatbot_header_top'>
                <h2 className='bold_text'>Name your Chatbot</h2>
                <TextField
                  label='Name'
                  variant='outlined'
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  onChange={(e) => setChatbotTitle(e.target.value)}
                  value={chatbotTitle}
                />
              </div>

              <>
                <h2 className='bold_text'>Display to connect channel(s)</h2>
                {
                  listItemsData?.channels?.map((ch, i) =>
                    <LogoListItem
                      key={i}
                      checked={platforms?.includes(ch.slug)}
                      handleClick={() => handlePlatform(ch.slug)}
                    >
                      <img
                        className='w-8'
                        src={ch.img} alt={ch.name} />
                      <p>{ch.name}</p>
                    </LogoListItem>

                  )
                }
              </>

              <div className='mt-5'>
                <h2 className='bold_text'>Select Chatbot Expertise</h2>
                {
                  listItemsData?.chatBotExpertise?.map((item, i) =>
                    <ListItem
                      key={item.id}
                      id={item.id}
                      checked={expertises.includes(item.id)}
                      handleClick={() => handleExpertise(item.id)}
                    >
                      {item.name}
                    </ListItem>)
                }
                {/* <ListItem
                  id={3}
                  // checked={isChecked}
                  handleClick={() => handleExpertise(3)}
                >
                  FAQs
                </ListItem>
                <ListItem
                  id={4}
                  // checked={isChecked}
                  handleClick={() => handleExpertise(4)}
                >
                  Company Specific Talk
                </ListItem>
                <ListItem
                  id={5}
                  // checked={isChecked}
                  handleClick={() => handleExpertise(5)}
                >
                  Industry Expert
                </ListItem>
                <ListItem
                  id={6}
                  // checked={isChecked}
                  handleClick={() => handleExpertise(6)}
                >
                  Escalation
                </ListItem> */}
              </div>
            </div>

            {/* <div className='bg-white w-[100vw] mt-10'>

          {chatbotTab === 2 && <Chatbot_tab_2_new changeChatbotTab={changeChatbotTab} user={userData} />}
          {chatbotTab === 3 && <Chatbot_faq_details changeChatbotTab={changeChatbotTab} user={userData} />}
          {chatbotTab === 4 && <Chatbot_business_talk changeChatbotTab={changeChatbotTab} user={userData} />}
          {chatbotTab === 5 && <Chatbot_business_goal changeChatbotTab={changeChatbotTab} user={userData} />}
          {chatbotTab === 7 && <Chatbotfinish changeChatbotTab={changeChatbotTab} user={userData} />}
          {chatbotTab === 8 && <CreateChatbotLast changeChatbotTab={changeChatbotTab} user={userData} />}
        </div> */}
          </div>
          <div className='bg-white w-fit ml-[300px] mt-10'>
            {chatbotTab === 2 && (
              <Chatbot_tab_2_new
                changeChatbotTab={changeChatbotTab}
                user={userData}
              />
            )}
            {chatbotTab === 3 && (
              <FAQ
              setExpertises={setExpertises}
              expertiseLength={expertiseLength}
                changeChatbotTab={changeChatbotTab}
                user={userData}
                chatbotID={chatbotID}
                // chatbot={chatbot}
                chatbotTitle={chatbotTitle}
                setIsChecked={setIsChecked}
              />
            )}
            {chatbotTab === 4 && (
              <Chatbot_business_talk
                changeChatbotTab={changeChatbotTab}
                user={userData}
                // chatbot={chatbot}
                setIsChecked={setIsChecked}
              />
            )}
            {chatbotTab === 5 && (
              <Chatbot_business_goal
                // chatbot={chatbot}
                changeChatbotTab={changeChatbotTab}
                user={userData}
                setIsChecked={setIsChecked}
              />
            )}
            {chatbotTab === 6 && (
              <ChatbotEscalation
                changeChatbotTab={changeChatbotTab}
                user={userData}
                // chatbot={chatbot}
              />
            )}
            {chatbotTab === 7 && (
              <Chatbotfinish
                changeChatbotTab={changeChatbotTab}
                user={userData}
              />
            )}
            {chatbotTab === 8 && (
              <CreateChatbotLast
                changeChatbotTab={changeChatbotTab}
                user={userData}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
