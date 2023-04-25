import { TextField, Switch, Alert, CircularProgress } from '@mui/material';
import { Box, Typography, IconButton } from '@mui/material';
import { useState, useCallback, useEffect } from 'react';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import Snackbar from '@mui/material/Snackbar';
import { useDispatch, useSelector } from "react-redux";

import ConversationCard from './ConversationCard';
import ActionAlert from '../Alert/ActionAlert';
import MySnackbar from '../ui/MySnackbar/MySnackbar';
import {post, get, put} from '../../network';
import { json } from 'react-router-dom';

const Chatbot_business_goal = ({ chatbot, changeChatbotTab }) => {
    const [expertiseId, setExpertiseId] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [name, setName] = useState("")
    const [position, setPosition] = useState("")
    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const { user } = useSelector((state) => state.user);

    useEffect(()=>{
        const businessGoalExpertise = chatbot?.expertises.find(expertise=>expertise.expertise_type==="ExpertiseType.FREE_FORM");
        if (businessGoalExpertise) {
            setLoading(true);
            get(
                `https://api.chatsimple.ai/v0/users/${user.user_id}/chatbot_expertises/${businessGoalExpertise.chatbot_expertise_id}`,
            ).then((response) =>{
                const {form_information, chatbot_expertise_id } = response.data;
                const form = JSON.parse(form_information.replace(/'/g, "\""));
                const {name, position} = form.business_small_talk[0];
                setExpertiseId(chatbot_expertise_id);
                setName(name);
                setPosition(position);
                setLoading(false);
            });
        }
    }, [chatbot]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setError(false);
        setSuccess(false);
    };

    const handleCreate = async () => {
        setLoading(true);
        let data = {
            expertise_title: "Specific domain expertise",
            expertise_type: "FREE_FORM",
            form_information: {
                business_small_talk: [
                    {
                        name,
                        position,
                    }
                ]
            },
            is_active: "True",
            chatbot_id: chatbot.chatbot_id
        }

        try {
            const expertiseId = uuidv4();
            const response = await post(
                `https://api.chatsimple.ai/v0/users/${user.user_id}/chatbot_expertises/${expertiseId}`,
                data,
            );
            setExpertiseId(expertiseId);
            setSuccess(true);
            setLoading(false);
            setSnackbarMessage(response.data.message)
            //window.alert(response.data.message);

        }
        catch (e) {
            setError(true);
            setSnackbarMessage(e.message)
            // window.alert(e.message)
        }
    };

    const handleUpdate = async () => {
        setLoading(true);
        let data = {
            expertise_title: "Specific domain expertise",
            expertise_type: "FREE_FORM",
            form_information: {
                business_small_talk: [
                    {
                        name,
                        position,
                    }
                ]
            },
            is_active: "True",
            chatbot_id: chatbot.chatbot_id
        }
        try {
            const response = await put(
                `https://api.chatsimple.ai/v0/users/${user.user_id}/chatbot_expertises/${expertiseId}?update_mask=is_active`,
                data
            );
            setSuccess(true);
            setLoading(false);
            setSnackbarMessage(response.data.message)
            //window.alert(response.data.message);

        }
        catch (e) {
            setError(true);
            setSnackbarMessage(e.message)
            // window.alert(e.message)
        }
    };

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };

    return (
        <>
            <div className='display_flex'>


                <div className='chatbot_dsplay_column'>
                    <div className='chatbot_display_text'>
                        <h1 className='bold_text font_32 margintop'>Business Goal</h1>
                        <p >
                            Design a chatbot that knows your goal and acts like a brand ambassador! depending on the position <br /> you assigns, the bot will model itself after the corporate
                            identity in appearance, demanour and values. <br /> <br />
                            Tell us what position you wish your bot to taken on for example(Insurance sales in Ontario).
                        </p>

                        <div className='display_flex margintop'>
                            <div>
                                <TextField
                                    label="Name"
                                    className='muitextfield'
                                    variant="outlined"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </div>
                        </div>

                        <div className='display_flex margintop'>
                            <div>
                                <TextField
                                    label="Position"
                                    className='muitextfield_position'
                                    variant="outlined"
                                    value={position}
                                    onChange={(event) => setPosition(event.target.value)}
                                />
                            </div>
                        </div>

                        <div className=''>
                            <button className='text-sm text-white px-5 w-32 h-10 bg-[#66B467] py-2 rounded-full disabled:bg-gray-200'
                                disabled={loading}
                                onClick={expertiseId? handleCreate : handleUpdate}>
                                {loading ? <CircularProgress
                                    size={16}
                                /> : (expertiseId?"Create":"Save")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <MySnackbar
                open={success}
                handleClose={handleClose}
                message={snackbarMessage}
                variant='success'
            />
            <MySnackbar
                open={error}
                handleClose={handleClose}
                message={snackbarMessage}
                variant='error'
            />
        </>
    )
}

export default Chatbot_business_goal;