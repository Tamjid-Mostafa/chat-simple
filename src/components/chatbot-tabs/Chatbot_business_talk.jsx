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


const Chatbot_business_talk = ({ changeChatbotTab, chatbot }) => {

    const [isChecked, setIsChecked] = useState(false);
    const [businessName, setBusinessName] = useState("")
    const [businessHours, setBusinessHours] = useState("")
    const [industry, setIndustry] = useState("")
    const [history, setHistory] = useState("")
    const [supportEmail, setSupportEmail] = useState("")
    const [dirty, setDirty] = useState("")
    const [inputs, setInputs] = useState([""]);
    const [loading, setLoading] = useState(false)
    const initialValue = "Custom Fields";
    const [value, setValue] = useState(initialValue);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [expertiseId, setExpertiseId] = useState("");
    const [retrievedFields, setRetrievedFields] = useState(null);


    const { showSnackbar } = useSnackbar();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setError(false);
        setSuccess(false);
    };

    const { user } = useSelector((state) => state.user);


    const handleToggle = () => {
        setIsChecked(!isChecked);
    };


    useEffect(() => {
        const businessGoalExpertise = chatbot?.expertises.find(expertise => expertise.expertise_type === "ExpertiseType.FREE_FORM");
        // console.log(businessGoalExpertise)
        if (businessGoalExpertise) {
            setLoading(true);
            get(
                `https://api.chatsimple.ai/v0/users/${user.user_id}/chatbot_expertises/${businessGoalExpertise.chatbot_expertise_id}`,
            ).then((response) => {
                // const {  } = response.data;
                console.log(response.data)
                // const form = JSON.parse(form_information.replace(/'/g, "\""));
                // const { name, position } = form.business_small_talk[0];
                setExpertiseId(chatbot_expertise_id);
                setBusinessName("")
                setBusinessHours("")
                setIndustry("")
                setHistory("")
                setInputs([""])
                setSupportEmail()
                setLoading(false);
            });
        }
    }, [chatbot]);


    const saveToLocalStorage = (fields) => {
        localStorage.setItem(`chatbot_${fields.chatbot_id}`, JSON.stringify(fields));
    };
    // Retrieve for local storage
    useEffect(() => {
        setLoading(true);
        const getFromLocalStorageById = (chatbot_id) => {
            const data = localStorage.getItem(`chatbot_${chatbot_id}`);
            return data ? JSON.parse(data) : null;
        };
        const data = getFromLocalStorageById(chatbot?.chatbot_id);

        // const business_small_talk = chatbot?.expertises.find(expertise => expertise.expertise_type === "ExpertiseType.FREE_FORM");
        setRetrievedFields(data);
        setBusinessName("")
        setBusinessHours("")
        setIndustry("")
        setHistory("")
        setInputs([""])
        setSupportEmail("")
        setLoading(false);
        setExpertiseId(data?.chatbot_id || '');
    }, [chatbot?.chatbot_id]);

    console.log(retrievedFields)


    const handleBusinessDetails = async () => {
        setLoading(true)
        const data = {
            expertise_title: "Business Small Talk",
            expertise_type: "FAQ",
            form_information: {
                business_small_talk: [
                    {
                        businessName: businessName,
                        businessHours: businessHours,
                        industry: industry,
                        history: history,
                        supportEmail: supportEmail,
                        custom_fields: { inputs, value }
                    }
                ]
            },
            is_active: "True",
            chatbot_id: chatbot?.chatbot_id
        }
        let headers = {
            "x-access-token": "skip_validation_for_admin",
            "Content-Type": "application/json"
        }
        try {
            const response = await axios.post(
                `https://api.chatsimple.ai/v0/users/${user.user_id}/chatbot_expertises/${uuidv4()}`,
                data,
                { headers }
            );
            showSnackbar(response.data.message, 'success');
            setLoading(false)
            saveToLocalStorage(data)

            // window.alert(response.data.message);
        }
        catch (e) {
            showSnackbar(e.message, 'error');
            setError(true);
            //window.alert(e.message)
        }
    }




    const handleInputChange = (e, index) => {
        const { value } = e.target;
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
    };
    const handleChange = (value) => {
        setValue(value);
    };

    const handleAddInput = () => {
        setInputs([...inputs, ""]);
    };

    const handleRemoveInput = (index) => {
        const newInputs = [...inputs];
        newInputs.splice(index, 1);
        setInputs(newInputs);
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
                        value={businessName}
                        onChange={(event) => setBusinessName(event.target.value)}
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
                        value={businessHours}
                        onChange={(event) => setBusinessHours(event.target.value)}
                    />

                    <TextField
                        label="Industry"
                        variant="outlined"
                        value={industry}
                        onChange={(event) => setIndustry(event.target.value)}
                    />

                    <TextField
                        label="History"
                        variant="outlined"
                        value={history}
                        onChange={(event) => setHistory(event.target.value)}
                    />

                    <TextField
                        label="Support Email"
                        variant="outlined"
                        value={supportEmail}
                        size="small"
                        onChange={(event) => setSupportEmail(event.target.value)}
                    />
                </div>
                <button className='flex items-center gap-2 bg-[#66B467] text-xs text-white px-4 py-2.5 rounded-full' onClick={handleAddInput}>
                    <img src={Add} alt="" />
                    Add Field
                </button>

                {inputs.map((input, index) => (
                    <div key={index} className="flex items-center gap-5">
                        <div className=''>
                            <EditableElement onChange={handleChange}>
                                <div style={{ outline: "none" }}
                                    className='flex items-center gap-3'
                                >
                                    <p>{initialValue}</p>
                                    <DriveFileRenameOutlineIcon className='cursor-pointer'
                                    />
                                </div>
                            </EditableElement>
                            <TextField
                                variant="outlined"
                                value={input}
                                size="small"
                                onChange={(e) => handleInputChange(e, index)}
                            />
                        </div>
                        {inputs.length >= 2 ?
                            <button button type="button" onClick={() => handleRemoveInput(index)}>
                                <img src={trash} alt="" />
                            </button> : ""}

                    </div>
                ))
                }

                <div className=''>
                    {/* <div className=''>
                            <TextField
                                label="Comments"
                                variant="outlined"
                                value={supportEmail}
                                size="normal"
                                onChange={(event) => setSupportEmail(event.target.value)}
                            />
                        </div> */}
                    <button className='text-sm text-white px-5 w-32 h-10 bg-[#66B467] py-2 rounded-full disabled:bg-gray-200 mb-10'
                        disabled={loading}
                        onClick={handleBusinessDetails}>
                        {loading ? <CircularProgress
                            size={16}
                        /> : "Create"}
                    </button>
                </div>
            </div>

        </>
    )
}

export default Chatbot_business_talk;