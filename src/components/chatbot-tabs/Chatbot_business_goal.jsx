import { TextField, Switch, Alert, CircularProgress } from '@mui/material';
import { Box, Typography, IconButton } from '@mui/material';
import { useState, useCallback, useEffect } from 'react';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import Snackbar from '@mui/material/Snackbar';
import { useSelector } from "react-redux";
import { post, get, put } from '../../network';
import { useSnackbar } from '../ui/MySnackbar/useSnakeBar';

const Chatbot_business_goal = ({ chatbot, changeChatbotTab }) => {
    const [expertiseId, setExpertiseId] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [name, setName] = useState("")
    const [position, setPosition] = useState("")
    const [loading, setLoading] = useState(false);
    const [retrievedFields, setRetrievedFields] = useState(null);

    const { user } = useSelector((state) => state.user);


    // console.log(chatbot)

    const { showSnackbar } = useSnackbar();


    useEffect(() => {
        const businessGoalExpertise = chatbot?.expertises.find(expertise => expertise.expertise_type === "ExpertiseType.FREE_FORM");
        // console.log(businessGoalExpertise)
        if (businessGoalExpertise) {
            setLoading(true);
            get(
                `https://api.chatsimple.ai/v0/users/${user.user_id}/chatbot_expertises/${businessGoalExpertise.chatbot_expertise_id}`,
            ).then((response) => {
                const { form_information, chatbot_expertise_id } = response.data;
                // const form = JSON.parse(form_information.replace(/'/g, "\""));
                // const { name, position } = form.business_small_talk[0];
                setExpertiseId(chatbot_expertise_id);
                setName(name);
                setPosition(position);
                setLoading(false);
            });
        }
    }, [chatbot]);


    const saveToLocalStorage = (fields) => {
        localStorage.setItem(`chatbot_${fields.chatbot_id}`, JSON.stringify(fields));
    };
    // Retrieve for local storage
    useEffect(() => {
        const getFromLocalStorageById = (chatbot_id) => {
            const data = localStorage.getItem(`chatbot_${chatbot_id}`);
            return data ? JSON.parse(data) : null;
        };

        const data = getFromLocalStorageById(chatbot?.chatbot_id);
        setRetrievedFields(data);
        setName(name);
        setPosition(position);
        setExpertiseId(data?.chatbot_id || '');
    }, [chatbot?.chatbot_id]);

    console.log(retrievedFields)

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
            setLoading(false);
            saveToLocalStorage(fields);
            showSnackbar(response.data.message, 'success')
            //window.alert(response.data.message);

        }
        catch (e) {
            setError(true);
            showSnackbar(e.message, 'error');
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
            setLoading(false);
            showSnackbar('Successfully updated')
            //window.alert(response.data.message);

        }
        catch (e) {
            showSnackbar(e.message, 'error')
            // window.alert(e.message)
        }
    };

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };

    return (
        <>
            <div className='space-y-5 px-5'>
                <div>
                    <h1 className='font-bold text-2xl'>Business Goal</h1>
                    <p className='w-3/4'>
                        Design a chatbot that knows your goal and acts like a brand ambassador! depending on the position <br /> you assigns, the bot will model itself after the corporate
                        identity in appearance, demanour and values. <br /> <br />
                        Tell us what position you wish your bot to taken on for example(Insurance sales in Ontario).
                    </p>
                </div>


                <div className='flex flex-col gap-2'>
                    <TextField
                        label="Name"
                        className=''
                        variant="outlined"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <TextField
                        label="Position"
                        className=''
                        variant="outlined"
                        value={position}
                        onChange={(event) => setPosition(event.target.value)}
                    />
                </div>


                <div className=''>
                    <button className='text-sm text-white px-5 w-32 h-10 bg-[#66B467] py-2 rounded-full disabled:bg-gray-200'
                        disabled={loading}
                        onClick={expertiseId ? handleUpdate : handleCreate}>
                        {loading ? <CircularProgress
                            size={16}
                        /> : (expertiseId ? "Save" : "Create")}
                    </button>
                </div>
            </div>
        </>
    )
}

export default Chatbot_business_goal;