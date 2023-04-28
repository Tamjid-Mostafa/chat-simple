import React from 'react';
import MessengerImage from '../../assets/images/svg/messenger.svg';
import { Switch } from '@mui/material';
import displayimg from '../../assets/chatbotcardpic.png';

const BootCard = ({ changeChatbotTab, bot, setChatbotTitle, setChatbotID, handleDelete }) => {


  const edit = () => {
    changeChatbotTab(3)
    setChatbotTitle(bot?.chatbot_title)
    setChatbotID(bot?.chatbot_id)
  }

  const types = [];
  const expertiseTypes = [
    { type: 'FAQ', name: 'FAQ' },
    { type: 'BUSINESS_SMALL_TALK', name: 'Business small talk' },
    { type: 'PRE_QUALIFICATION_QUESTIONS', name: 'Pre qualification question' },
    { type: 'INFORMATION_GATHERING', name: 'Information gathering' },
    { type: 'PRODUCT_RECOMMENDATION', name: 'Product recommendation' },
    { type: 'ESCALATION', name: 'Escalation' },
    { type: 'FREE_FORM', name: 'Free Form' },
  ];

  // filter expertises type
  bot?.expertises?.forEach((el) => {
    expertiseTypes.forEach(
      (expertise) =>
        el.expertise_type.split('.')[1] === expertise.type &&
        types.push(expertise.name)
    );
  });

  return (
    <>
      <div className='border rounded-xl w-[350px] h-[520px] flex flex-col justify-between'>
        <div>
          <div className='flex justify-between p-4'>
            <div className='flex items-center  gap-3'>
              <img src={MessengerImage} alt='' />
              <div>
                <h4>{bot?.chatbot_title}</h4>
                <p className='text-sm'>Messenger</p>
              </div>
            </div>
            <div className=''>
              <Switch 
              checked={types?.length > 0}
              />
            </div>
          </div>
          <div className='my-5 '>
            <img src={displayimg} alt='My Image' />
          </div>
          
          <div className='mx-5'>
            <p>
              {bot?.expertises?.length} expertise enabled
            </p>
          </div>
          <div className='my-5 mx-5'>
            {types.map((type, index) => (
              <span key={index}>
                {index > 0 && (index === types?.length - 1 ? ' and ' : ', ')}
                {type}
              </span>
            ))}
          </div>
        </div>
        <div className='flex justify-end items-end my-5 mx-5 gap-5'>
          <button className='text-sm text-white px-5 bg-[#66B467] py-2 rounded-full'
            onClick={edit}
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(bot)}
            className='text-sm text-white px-5 bg-[#66B467] py-2 rounded-full'
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default BootCard;
