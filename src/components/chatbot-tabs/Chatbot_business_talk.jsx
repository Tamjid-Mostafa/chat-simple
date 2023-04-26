import { TextField, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from "react-redux";
import trash from '../../assets/images/svg/trash.svg'
import Add from "../../assets/images/svg/Add.svg";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { EditableElement } from '../EditableElement/EditableElement';
import { useSnackbar } from '../ui/MySnackbar/useSnakeBar';
import { get, put } from '../../network';


const Chatbot_business_talk = ({ changeChatbotTab, chatbot, setIsChecked }) => {

    
    const [state, setState] = useState({
        businessName: "",
        businessHours: "",
        industry: "",
        history: "",
        supportEmail: "",
        inputs: [""],
        loading: false,
        initialValue: "Custom Fields",
        value: "",
        expertiseId: "",
    });

    const { showSnackbar } = useSnackbar();
    const { user } = useSelector((state) => state.user);



    useEffect(() => {
        const businessTalk = chatbot?.expertises.find(
            (expertise) => expertise.expertise_type === "ExpertiseType.BUSINSESS_SMALL_TALK"
        );

        if (businessTalk) {
            setState((prevState) => ({ ...prevState, loading: true }));
            get(
                `https://api.chatsimple.ai/v0/users/${user.user_id}/chatbot_expertises/${businessTalk.chatbot_expertise_id}`
            ).then((response) => {
                const { form_information, chatbot_expertise_id } = response.data;
                const {
                    businessHours,
                    businessName,
                    custom_fields,
                    history,
                    industry,
                    supportEmail,
                } = form_information.business_small_talk[0];
                setState((prevState) => ({
                    ...prevState,
                    expertiseId: chatbot_expertise_id,
                    businessName: businessName,
                    businessHours: businessHours,
                    industry: industry,
                    history: history,
                    supportEmail: supportEmail,
                    inputs: custom_fields.inputs,
                    value: custom_fields.value,
                    loading: false,
                }));
            });
        }
    }, [chatbot]);


    const handleCreate = async () => {
        setState((prevState) => ({ ...prevState, loading: true }));
        const fields = {
            expertise_title: "Business Small Talk",
            expertise_type: "BUSINSESS_SMALL_TALK",
            form_information: {
                business_small_talk: [
                    {
                        businessName: state.businessName,
                        businessHours: state.businessHours,
                        industry: state.industry,
                        history: state.history,
                        supportEmail: state.supportEmail,
                        custom_fields: { inputs: state.inputs, value: state.value },
                    },
                ],
            },
            is_active: "True",
            chatbot_id: chatbot?.chatbot_id,
        };
        let headers = {
            "x-access-token": "skip_validation_for_admin",
            "Content-Type": "application/json",
        };
        try {
            const expertiseId = uuidv4();
            const response = await axios.post(
                `https://api.chatsimple.ai/v0/users/${user.user_id}/chatbot_expertises/${expertiseId}`,
                fields,
                { headers }
            );
            showSnackbar(response.data.message, "success");
            setState((prevState) => ({
                ...prevState,
                expertiseId: expertiseId,
                loading: false,
            }));
            // saveToLocalStorage(fields)
            // window.alert(response.data.message);
        } catch (e) {
            showSnackbar(e.message, "error");
            //window.alert(e.message)
        }
    };

    const handleUpdate = async () => {
        setState((prevState) => ({ ...prevState, loading: true }));
        const fields = {
            expertise_title: "Business Small Talk",
            expertise_type: "BUSINSESS_SMALL_TALK",
            form_information: {
                business_small_talk: [
                    {
                        businessName: state.businessName,
                        businessHours: state.businessHours,
                        industry: state.industry,
                        history: state.history,
                        supportEmail: state.supportEmail,
                        custom_fields: { inputs: state.inputs, value: state.value },
                    },
                ],
            },
            is_active: "True",
            chatbot_id: chatbot?.chatbot_id,
        };
        try {
            const response = await put(
                `https://api.chatsimple.ai/v0/users/${user.user_id}/chatbot_expertises/${state.expertiseId}?update_mask=form_information`,
                fields
            );
            showSnackbar('Successfully updated')
            // setExpertiseId(expertiseId)
            setState((prevState) => ({
                ...prevState,
                expertiseId: state.expertiseId,
                loading: false,
            }));
            // saveToLocalStorage(fields)
            //window.alert(response.data.message);

        }
        catch (e) {
            showSnackbar(e.message, 'error')
            // window.alert(e.message)
        }
    };


    const handleInputChange = (e, index) => {
        const { value } = e.target;
        const newInputs = [...state.inputs];
        newInputs[index] = value;
        setState((prevState) => ({ ...prevState, inputs: newInputs }));
    };
    const handleChange = (value) => {
        setState((prevState) => ({ ...prevState, value }));
    };

    const handleAddInput = () => {
        setState((prevState) => ({ ...prevState, inputs: [...prevState.inputs, ""] }));
    };

    const handleRemoveInput = (index) => {
        const newInputs = [...state.inputs];
        newInputs.splice(index, 1);
        setState((prevState) => ({ ...prevState, inputs: newInputs }));
    };

    return (
        <>

            <div className='space-y-5 px-5'>
                <div className='lg:w-3/4 w-full space-y-3'>
                    <h1 className='font-bold text-2xl'>Business Small Talk</h1>
                    <p className='text-sm'>
                        This expertise empowers your chatbot to serve as a customer representative, skillfully handling inquiries using your business's specified tone and vocabulary. By providing your business name, the chatbot offers human-like responses to general questions about your business. If you would like the chatbot to be more robust, select additional custom fields to personalize the bot to your business needs, ensuring a tailored and seamless customer experience.
                    </p>
                </div>

                <div>
                    <TextField
                        label="Business Name"
                        variant="outlined"
                        value={state.businessName}
                        onChange={(event) => setState({ ...state, businessName: event.target.value })}
                    />
                </div>

                <div className='space-y-3'>
                    <h2 className='font-bold text-xl'>
                        Personalise your bot
                    </h2>
                    <p className='text-sm'>
                        Select from a list of common fields other businesses use or build your own custom fields.
                    </p>
                </div>

                <div className='flex flex-col gap-5 w-52'>
                    <TextField
                        label="Business Hours"
                        variant="outlined"
                        value={state.businessHours}
                        onChange={(event) => setState({ ...state, businessHours: event.target.value })}
                    />

                    <TextField
                        label="Industry"
                        variant="outlined"
                        value={state.industry}
                        onChange={(event) => setState({ ...state, industry: event.target.value })}
                    />

                    <TextField
                        label="History"
                        variant="outlined"
                        value={state.history}
                        onChange={(event) => setState({ ...state, history: event.target.value })}
                    />

                    <TextField
                        label="Support Email"
                        variant="outlined"
                        value={state.supportEmail}
                        size="small"
                        onChange={(event) => setState({ ...state, supportEmail: event.target.value })}
                    />
                </div>
                <button className='flex items-center gap-2 bg-[#66B467] text-xs text-white px-4 py-2.5 rounded-full' onClick={handleAddInput}>
                    <img src={Add} alt="" />
                    Add Field
                </button>

                {state.inputs.map((input, index) => (
                    <div key={index} className="flex items-center gap-5">
                        <div className=''>
                            <EditableElement onChange={handleChange}>
                                <div style={{ outline: "none" }}
                                    className='flex items-center gap-3'
                                >
                                    <p>{state.initialValue}</p>
                                    <DriveFileRenameOutlineIcon className='cursor-pointer'
                                    />
                                </div>
                            </EditableElement>
                            <TextField
                                variant="outlined"
                                value={state.inputs[index]}
                                size="small"
                                onChange={(e) => handleInputChange(e, index)}
                            />
                        </div>
                        {state.inputs.length >= 2 ?
                            <button button type="button" onClick={() => handleRemoveInput(index)}>
                                <img src={trash} alt="" />
                            </button> : ""}

                    </div>
                ))
                }

                <div className=''>
                    <button className='text-sm text-white px-5 w-32 h-10 bg-[#66B467] py-2 rounded-full disabled:bg-gray-200'
                        disabled={state.loading}
                        onClick={state.expertiseId ? handleUpdate : handleCreate}>
                        {state.loading ? <CircularProgress
                            size={16}
                        /> :
                            <>
                                {state.expertiseId ? "Update" : "Create"}
                            </>}
                    </button>
                </div>
            </div>

        </>
    )
}

export default Chatbot_business_talk;