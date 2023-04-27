import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { CircularProgress, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import cn from 'clsx'
import s from './FAQ.module.css'
import { v4 as uuidv4 } from 'uuid';
import { useSnackbar } from '../ui/MySnackbar/useSnakeBar';
import styled from 'styled-components';
import { get, put } from '../../network';


// const CustomTextField = React.memo(({ id, field, value, onChange }) => {
//     const handleChange = (event) => {
//         onChange(event);
//     };
//     const handleKeyDown = (event) => {
//         if (event.key === ' ') {
//             event.stopPropagation();
//         }
//     };
//     return (
//         <TextField
//             sx={{
//                 '& fieldset': { border: 'none' },
//                 '& .MuiInputBase-input': {
//                     whiteSpace: 'normal',
//                 },
//                 '& .Mui-focused .MuiInputBase-input': {
//                     whiteSpace: 'normal',
//                 },
//             }}
//             multiline
//             fullWidth
//             className={s.wrapText}
//             value={value}
//             onChange={handleChange}
//             onKeyDown={handleKeyDown}
//         />
//     );
// });







const FAQ = ({ changeChatbotTab, chatbotTitle }) => {
    const { chatbot } = useSelector((state) => state.chatbot)
    const { user } = useSelector((state) => state.user);
    const [isTrue, setIsTrue] = useState(false);
    const [loading, setLoading] = useState(false);
    const [expertiseId, setExpertiseId] = useState("");
    const [url, setUrl] = useState('');

    const [data, setData] = useState([])
    const [rows, setRows] = useState([])

    const { showSnackbar } = useSnackbar();

    useMemo(() => {
        if (data) {
            const combinedData = Object.keys(data?.question || {}).map((key, index) => {
                return {
                    id: index + 1,
                    question: data.question[key],
                    answer: data.answer[key] || '',
                };
            });
            setRows(combinedData);
        }
    }, [data]);

    useEffect(() => {
        const FAQExpertise = chatbot?.expertises.find(expertise => expertise.expertise_type === "ExpertiseType.FAQ");
        if (FAQExpertise) {
            setLoading(true);
            get(
                `https://api.chatsimple.ai/v0/users/${user.user_id}/chatbot_expertises/${FAQExpertise.chatbot_expertise_id}`,
            ).then((response) => {
                const { form_information, chatbot_expertise_id } = response.data;
                setRows(form_information.faqs)
                setExpertiseId(chatbot_expertise_id);
                setLoading(false);
                
            });
        }
    }, [chatbot]);


    const buildFaq = async () => {
        setLoading(true)
        let fields = {
            expertise_title: 'FAQ',
            expertise_type: 'FAQ',
            form_information: {
                faqs: rows,
            },
            is_active: 'True',
            chatbot_id: chatbot?.chatbot_id,
        };
        let headers = {
            'x-access-token': 'skip_validation_for_admin',
            'Content-Type': 'application/json',
        };
        async function postDataWithIncreasedTimeout() {
            try {
                const expertiseId = uuidv4();
                const response = await axios.post(
                    `https://api.chatsimple.ai/v0/users/${user.user_id
                    }/chatbot_expertises/${expertiseId}`,
                    fields,
                    {
                        headers,
                        timeout: 30000, // Set the timeout to 30000 milliseconds (30 seconds)
                    }
                );
                setExpertiseId(expertiseId)
                showSnackbar(response.data.message);
                setLoading(false)
            } catch (e) {
                showSnackbar(e.message, 'error');
            }
        }

        postDataWithIncreasedTimeout();
    };

    const handleUpdate = async () => {
        setLoading(true);
        let fields = {
            expertise_title: 'FAQ',
            expertise_type: 'FAQ',
            form_information: {
                faqs: rows,
            },
            is_active: 'True',
            chatbot_id: chatbot?.chatbot_id,
        };
        try {
            const response = await put(
                `https://api.chatsimple.ai/v0/users/${user.user_id}/chatbot_expertises/${expertiseId}?update_mask=is_active`,
                fields
            );
            setLoading(false);
            showSnackbar("Updated Successfully");
        }
        catch (e) {
            showSnackbar(e.message, 'error')
        }
    };
    
    const generateFaq = async () => {
        setLoading(true)
        try {
            let headers = {
                'x-access-token': 'skip_validation_for_admin',
                'Content-Type': 'application/json',
            };
    
            const response = await axios.post(
                `https://api.chatsimple.ai/v0/users/${user.user_id}/chatbot_expertises/extractfaq`,
                { url: url },
                { headers }
            );
    
            setData(response.data);
            setIsTrue(true);
            setLoading(false)
            showSnackbar('FAQ Generated successfully', 'success');
        } catch (error) {
            showSnackbar(error.message, 'error');
        }
    };
    
    const handleCellChange = useCallback((id, field, value) => {
        setRows((prevRows) =>
            prevRows.map((row) => {
                if (row.id === id) {
                    return { ...row, [field]: value };
                }
                return row;
            })
        );
    }, []);
    
    const handleCellChangeWithParams = useCallback((id, field) => {
        return (event) => {
            handleCellChange(id, field, event.target.value);
        };
    }, [handleCellChange]);
    
   


    const columns = [
        {
            field: 'question',
            headerName: 'Question',
            flex: 1,
            renderCell: (params) => (
                <TextField
                    sx={{
                        '& fieldset': { border: 'none' },
                        '& .MuiInputBase-input': {
                            whiteSpace: 'normal',
                        },
                        '& .Mui-focused .MuiInputBase-input': {
                            whiteSpace: 'normal',
                        },
                    }}
                    multiline
                    fullWidth
                    className={s.wrapText}
                    value={params.value}
                    onChange={handleCellChangeWithParams(params.id, params.field)}
                    onKeyDown={(event) => {
                        if (event.key === ' ') {
                            event.stopPropagation();
                        }
                    }}
                />
            ),
        },
        {
            field: 'answer',
            headerName: 'Answer',
            flex: 2,
            renderCell: (params) => (
                <TextField
                    sx={{
                        '& fieldset': { border: 'none' },
                        '& .MuiInputBase-input': {
                            whiteSpace: 'normal',
                        },
                        '& .Mui-focused .MuiInputBase-input': {
                            whiteSpace: 'normal',
                        },
                    }}
                    multiline
                    fullWidth
                    className={s.wrapText}
                    value={params.value}
                    onChange={handleCellChangeWithParams(params.id, params.field)}
                    onKeyDown={(event) => {
                        if (event.key === ' ') {
                            event.stopPropagation();
                        }
                    }}
                />
            ),
        },
    ];
    

    return (
        <div className='px-5'>
            <div className='space-y-5'>
                <h1 className='text-xl font-bold '>FAQ</h1>
                <p className='text-sm'>
                    This expertise is designed to handle frequently asked questions (FAQs) for a specific business. It matches a given question to a list of predefined questions and provides the corresponding answer. This expertise helps the chatbot quickly address common customer inquiries without the need for human intervention. It can scrape information from an FAQ page and automatically populate the questions and answers.
                </p>
                <div className='flex items-center gap-5'>
                    <div>
                        <TextField
                            onChange={(event) => setUrl(event.target.value)}
                            label='Enter Url'
                            variant='outlined'
                            disabled={chatbotTitle === '' && true}
                        />
                    </div>
                    <div className=''>
                        <button className=' text-sm text-white px-5 w-32 h-10 bg-[#66B467] py-2 rounded-full disabled:bg-gray-200'
                            disabled={loading || chatbotTitle === ''}
                            onClick={generateFaq}>
                            {loading ? <CircularProgress
                                size={16}
                            /> : "Import FAQ"}
                        </button>
                    </div>
                </div>

                <div className='mr-5'>
                    <Box sx={{
                        height: 500,
                        width: '100%',
                    }}>
                        <DataGrid
                            sx={{
                                borderTop: '5px solid',
                                borderTopColor: '#66B467',
                                borderRadius: '5px',
                            }}
                            rows={rows}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 5,
                                    },
                                },
                            }}
                            rowHeight={100}
                            pageSizeOptions={[5]}
                            disableRowSelectionOnClick
                        />
                    </Box>
                </div>
                <button className=' text-sm text-white px-5 w-32 h-10 bg-[#66B467] py-2 rounded-full disabled:bg-gray-200'
                    disabled={loading || rows?.length === 0}
                    onClick={expertiseId ? handleUpdate : buildFaq}>
                    {loading ? <CircularProgress
                        size={16}
                    /> :
                        <>
                            {expertiseId ? "Update" : "Create"}
                        </>}
                </button>
            </div>
        </div>
    );
}

export default FAQ;