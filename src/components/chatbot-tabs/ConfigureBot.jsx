import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Switch } from 'antd';
import bot from "../../assets/bot-logo.jpeg"
import { useState } from 'react';
const ConfigureBot = ({type, typeIcon, botName, botIcon}) => {
    const [checked, setChecked] = useState(false)
  return (
    <div className='configure__chatbot'>
        <div className="configure__chatbot__header">
            <img src = {typeIcon} alt = {type}/>
            <p>{type}</p>
        </div>
        <div className='configure__chatbot__body'>
            <div classsName='bot__logo'>
                {/* <img src = {botIcon} alt = {botName}/> */}
                <div >
                    <img src={bot} alt="bot"  className='bbbb' />
                </div>
            </div>
            <div className='bot__info'>
                <p>{botName}</p>
                <div className='bot__page__link'>
                    <p>Page Link</p>
                    <ContentCopyIcon />
                </div>
            </div>
        </div>
        <div className='configure__chatbot__footer'>
            <Switch style={{backgroundColor: checked? "#66B467": "gray"}} onChange={(e)=>setChecked(e)} />
        </div>
    </div>
  )
}

export default ConfigureBot