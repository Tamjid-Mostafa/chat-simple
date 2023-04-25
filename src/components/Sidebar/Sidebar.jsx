import WaveArrow from '../../assets/images/svg/WaveArrow.svg'
import chatbotImg from '../../assets/chatbot.png'
import conversationImg from '../../assets/conversation.png'
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import Logo from '../../assets/white_transparent.svg'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import cn from 'clsx'
import s from './Sidebar.module.css'


const Sidebar = ({changeDashboardTab, setIsExpand, isExpand}) => {

  

  return (
    <div className={cn(s.root, 'flex flex-col justify-between h-full p-5')}>
       {/* Sidebar Header */}
      <div className='space-y-5'>
        <div className='h-28 w-36'>
          <img
          className={`${!isExpand ? 'scale-75' : 'scale-100'}`}
          src={Logo} alt="logo" />
        </div>
        <hr className='border-accent-7' />
        <div className='space-y-5'>
          <div className='flex gap-5  cursor-pointer' onClick={()=>changeDashboardTab(1)}>
            <img src={WaveArrow} alt="dashboard" />
            <p className={`text-accent-0 transition-all duration-500 text-md ${!isExpand ? 'scale-0' : 'scale-100'}`}>Dashboard</p>
          </div>
          <div className='flex gap-5  cursor-pointer' onClick={()=>changeDashboardTab(2)}>
            <img src={chatbotImg} alt="dashboard" />
            <p className={`text-accent-0 transition-all duration-500 text-md ${!isExpand ? 'scale-0' : 'scale-100'}`}>Chatbot</p>
          </div>
          <div className='flex gap-5'>
            <img src={conversationImg} alt="dashboard" />
            <p className={`text-accent-0 transition-all duration-500 text-md ${!isExpand ? 'scale-0' : 'scale-100'}`}>Conversation</p>
          </div>
          <div
          
          className='flex gap-5'>
            {
              !isExpand ? 
              <ArrowBackIosIcon
              onClick={()=> setIsExpand(!isExpand)}
              className={`text-white  cursor-pointer`}/>
              :
              <ArrowForwardIosIcon 
              onClick={()=> setIsExpand(!isExpand)}
              className={`text-white  cursor-pointer`}/>
            }
            
            

          </div>
        </div>
      </div>
      {/* Sidebar Footer */}
        <div className='space-y-5'>
          <div className='flex gap-5'>
            {/* <img src={settingImg} alt="dashboard" /> */}
            <SettingsIcon  className='text-white' />
            <p className={`text-accent-0 transition-all duration-500 text-md ${!isExpand ? 'scale-0' : 'scale-100'}`}>Settings</p>
          </div>
          <div className='flex gap-5'>
            <HelpIcon  className='text-white'/>
            <p className={`text-accent-0 transition-all duration-500 text-md ${!isExpand ? 'scale-0' : 'scale-100'}`}>Help</p>
          </div>
        </div>
      
    </div>
  )
}

export default Sidebar