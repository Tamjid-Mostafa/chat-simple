import React, { useEffect, useState } from 'react';
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

const CustomTextField = ({ id, field, value, onChange }) => {
    const handleChange = (event) => {
        onChange(id, field, event.target.value);
    };
    const handleKeyDown = (event) => {
        if (event.key === ' ') {
            event.stopPropagation();
        }
    };
    return <TextField
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
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        
    />;
};
const FAQ = ({ changeChatbotTab, chatbotTitle }) => {
    const { user } = useSelector((state) => state.user);
    const [isTrue, setIsTrue] = useState(false);
    const [loading, setLoading] = useState(false);

    const [url, setUrl] = useState('');




    const [faqs, setFaqs] = useState({
        "answer": {

        },
        "question": {

        }
    });
    const [data, setData] = useState([])
    const [rows, setRows] = useState([])


    const { showSnackbar } = useSnackbar();


    useEffect(() => {
        setRows(data);
    }, [data]);
    useEffect(() => {
        // Combine questions and answers into a single array of objects
        if (faqs) {
            const combinedData = Object.keys(faqs?.question).map((key, index) => {
                return {
                    id: index + 1,
                    question: faqs.question[key],
                    answer: faqs.answer[key] || '',
                };
            });
            setData(combinedData);
        }
    }, [faqs]);



    const buildFaq = async () => {
        setLoading(true)
        let fields = {
            expertise_title: 'FAQ',
            expertise_type: 'FAQ',
            form_information: {
                faqs: rows,
            },
            is_active: 'True',
            chatbot_id: uuidv4(),
        };
        let headers = {
            'x-access-token': 'skip_validation_for_admin',
            'Content-Type': 'application/json',
        };

        async function postDataWithIncreasedTimeout() {
            try {
                const response = await axios.post(
                    `https://api.chatsimple.ai/v0/users/${user.user_id
                    }/chatbot_expertises/${uuidv4()}`,
                    fields,
                    {
                        headers,
                        timeout: 30000, // Set the timeout to 30000 milliseconds (30 seconds)
                    }
                );
                showSnackbar(response.data.message, 'success');
                setLoading(false)

            } catch (e) {
                showSnackbar(e.message, 'error');
            }
        }

        postDataWithIncreasedTimeout();
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

            setFaqs(response.data);
            setIsTrue(true);
            setLoading(false)
            showSnackbar('FAQ Generated successfully', 'success');
        } catch (error) {
            showSnackbar(error.message, 'error');
        }
    };

    const handleCellChange = (id, field, value) => {
        const updatedRows = rows.map((row) => {
            if (row.id === id) {
                return { ...row, [field]: value };
            }
            return row;
        });
        setRows(updatedRows);
    };


    const columns = [
        {
            field: 'question',
            headerName: 'Question',
            flex: 1,
            renderCell: (params) => (
                <CustomTextField
                    id={params.id}
                    field={params.field}
                    value={params.value}
                    onChange={handleCellChange}
                />
            )
        },
        {
            field: 'answer',
            headerName: 'Answer',
            flex: 2,
            borderRight: 'none',
            editable: 'cell',
            sortable: false,
            renderCell: (params) => (
                <CustomTextField
                    id={params.id}
                    field={params.field}
                    value={params.value}
                    onChange={handleCellChange}
                />
            )
            // valueGetter:handleCellEditCommit
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
                        <button className='text-sm text-white px-5 w-32 h-10 bg-[#66B467] py-2 rounded-full disabled:bg-gray-200'
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
                <button className='text-sm text-white px-5 w-32 h-10 bg-[#66B467] py-2 rounded-full disabled:bg-gray-200'
                    disabled={loading || rows.length === 0}
                    onClick={buildFaq}>
                    {loading ? <CircularProgress
                        size={16}
                    /> : "Build"}
                </button>
            </div>
        </div>
    );
}

export default FAQ;