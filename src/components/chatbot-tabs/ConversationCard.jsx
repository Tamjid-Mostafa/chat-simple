import SettingsIcon from '@mui/icons-material/Settings';
import messengerIcon from "../../assets/messenger.png";

import { Switch } from "antd"
import { useState } from 'react';
const ConversationCard = ({content, changeTab}) => {
    const [checked, setChecked] = useState(false)
    return (
        <div className="chat__conversation__card">
            <img src={messengerIcon} alt="mess" />
            <p>{content}</p>
            <div className="chat__conversation__card__btns_group">
                <Switch onChange={(e)=>setChecked(e)} style={{ backgroundColor: checked ? "#66B467": "gray" }} />
                <SettingsIcon onClick = {()=>changeTab(6)} />
            </div>
        </div>
    )
}

export default ConversationCard