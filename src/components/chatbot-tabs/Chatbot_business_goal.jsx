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

    const { user } = useSelector((state) => state.user);


    // console.log(chatbot)

    const { showSnackbar } = useSnackbar();


    useEffect(() => {
        const businessGoalExpertise = chatbot?.expertises.find(expertise => expertise.expertise_type === "ExpertiseType.FREE_FORM");

        if (businessGoalExpertise) {
            setLoading(true);
            get(
                `https://api.chatsimple.ai/v0/users/${user.user_id}/chatbot_expertises/${businessGoalExpertise.chatbot_expertise_id}`,
            ).then((response) => {
                const { form_information, chatbot_expertise_id } = response.data;
                // const form = JSON.parse(form_information.replace(/'/g, "\""));
                const { name, position } = form_information.business_goal[0];
                setExpertiseId(chatbot_expertise_id);
                setName(name);
                setPosition(position);
                setLoading(false);
            });
        }
    }, [chatbot]);


    // const saveToLocalStorage = (chatbotId, expertiseData) => {
    //     const chatbotData = JSON.parse(localStorage.getItem(`chatbot_${chatbotId}`)) || {};

    //     if (!chatbotData.expertises) {
    //       chatbotData.expertises = [];
    //     }

    //     const expertiseIndex = chatbotData.expertises.findIndex(
    //       (expertise) => expertise.chatbot_expertise_id === expertiseData.chatbot_expertise_id
    //     );

    //     if (expertiseIndex === -1) {
    //       chatbotData.expertises.push(expertiseData);
    //     } else {
    //       chatbotData.expertises[expertiseIndex] = expertiseData;
    //     }

    //     localStorage.setItem(`chatbot_${chatbotId}`, JSON.stringify(chatbotData));
    //   };
    // // Retrieve for local storage
    // useEffect(() => {
    //     const getExpertiseFromLocalStorage = (chatbotId, expertiseId) => {
    //         const chatbotData = JSON.parse(localStorage.getItem(`chatbot_${chatbotId}`)) || {};

    //         if (!chatbotData.expertises) {
    //           return null;
    //         }

    //         return chatbotData.expertises.find((expertise) => expertise.chatbot_expertise_id === expertiseId) || null;
    //       };

    //     const data = getExpertiseFromLocalStorage(chatbot?.chatbot_id, expertiseId);
    //     setRetrievedFields(data);
    //     // console.log(data)
    //     setName(name);
    //     setPosition(position);
    // }, [chatbot?.chatbot_id, expertiseId]);

    // console.log(expertiseId)

    const handleCreate = async () => {
        setLoading(true);
        let fields = {
            expertise_title: "Specific domain expertise",
            expertise_type: "FREE_FORM",
            form_information: {
                business_goal: [
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
                fields,
            );
            setExpertiseId(expertiseId);
            setLoading(false);
            // const dataToSave = {
            //     chatbot_expertise_id: expertiseId,
            //     ...fields,
            //   };
            //   saveToLocalStorage(chatbot.chatbot_id, dataToSave);

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
        let fields = {
            expertise_title: "Specific domain expertise",
            expertise_type: "FREE_FORM",
            form_information: {
                business_goal: [
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
                `https://api.chatsimple.ai/v0/users/${user.user_id}/chatbot_expertises/${expertiseId}?update_mask=form_information`,
                fields
            );
            setLoading(false);
            // console.log(fields)
            // const dataToSave = {
            //     chatbot_expertise_id: expertiseId,
            //     ...fields,
            //   };
            //   saveToLocalStorage(chatbot.chatbot_id, dataToSave);
            if (response.status === 200) {
                showSnackbar('Successfully updated')
            }
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
                        /> :
                            <>
                                {expertiseId ? "Update" : "Save"}
                            </>}
                    </button>
                </div>
            </div>
        </>
    )
}

export default Chatbot_business_goal;