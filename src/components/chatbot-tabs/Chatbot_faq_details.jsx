import { TextField, Switch, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Snackbar from '@mui/material/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { async } from 'q';

const Chatbot_faq_details = ({ changeChatbotTab }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const [data, setData] = useState('');
  const [url, setUrl] = useState('');
  const [faqs, setFaqs] = useState(null);
  const [isTrue, setIsTrue] = useState(false);
  const [loading, setLoading] = useState(false)
  const handleClose = () => {
    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    console.log(values);
    let questions = [];
    let answers = [];
    let newarr = [];

    // create array seperate question and answer
    for (let i = 0; i < Object.keys(values).length; i++) {
      const field = Object.keys(values)[i];
      if ('question' === field.slice(0, field.length - 1)) {
        questions.push(Object.values(values)[i]);
      } else if ('answer' === field.slice(0, field.length - 1)) {
        answers.push(Object.values(values)[i]);
      }
    }

    // crate array oj object

    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < answers.length; j++) {
        newarr.push({ question: questions[i], answer: answers[j] });
      }
    }

    await handleFAQSubmit(newarr);
  };

  const handleFAQSubmit = async (values) => {
    setLoading(true)
    let fields = {
      expertise_title: 'FAQ',
      expertise_type: 'FAQ',
      form_information: {
        faqs: values,
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
        setOpen(true);
        setData(response.data.message);
        setLoading(false)

      } catch (error) {
        setOpen(true);
        setData(e.message);
      }
    }

    postDataWithIncreasedTimeout();
  };

  const buildFaq = async () => {
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
    } catch (error) {
      setData(error.message);
    }
  };

  // creating arrray  of object faqs

  let faqArray = [];

  if (faqs) {
    for (let i = 0; i < Object.keys(faqs.answer).length; i++) {
      for (let j = 0; j < Object.keys(faqs.answer).length; j++) {
        if (
          !faqArray.some(
            (ele) =>
              ele.answer !== Object.values(faqs.answer)[i] &&
              ele.question !== Object.values(faqs.question)[j]
          )
        ) {
          faqArray.push({
            answer: Object.values(faqs.answer)[i],
            question: Object.values(faqs.question)[j],
          });
        }
      }
    }
  }

  return (
    <div className='display_flex' style={{ width: '100%' }}>
      <div className='chatbot_dsplay_column' style={{ width: '100%' }}>
        <div className='chatbot_display_text'>
        <h1 className='bold_text font_32 margintop'>FAQ</h1>
          <p className='text-sm'>
            ChatSimple uses technology to create FAQ automatically. Start
            generating a list of FAQ by inputing an <br /> URL where you would
            like answers to created from. You can also fine tune the
            auto-generated questions <br />
            answers to your satisfaction
          </p>
          <div className='display_flex margintop'>
            <div>
              <TextField
                onChange={(event) => setUrl(event.target.value)}
                label='Enter Url'
                variant='outlined'
              />
            </div>
            <div className='build_button'>
            <button className='text-sm text-white px-5 w-32 h-10 bg-[#66B467] py-2 rounded-full disabled:bg-gray-200'
                            disabled={loading}
                            onClick={buildFaq}>
                               {loading ? <CircularProgress
                               size={16}
                               /> : "Build"}
                            </button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col' style={{ width: '100%' }}>
          <div className='overflow-x-auto sm:-mx-6 lg:-mx-8' style={{ width: '100%' }}>
            <div className='inline-block w-full py-2 sm:px-6 lg:px-8'>
              <div className='overflow-hidden' style={{ width: '100%' }}>
                <table className='border-t-4 border-solid mt-4 border-green-400 rounded-md text-center text-sm font-light border-l border-r border-l-gray-200 shadow border-r-black' style={{ width: '100%' }}>
                  <thead className='border-b font-medium border-gray-300'></thead>
                  <tbody>
                    <tr className='border-b border-gray-300 bg-gray-100'>
                      <td className='whitespace-nowrap border-r px-6 py-4 font-medium border-gray-300'></td>
                      <td className='whitespace-nowrap border-r px-6 py-4 font-bold text-left border-gray-300'>
                        Question
                      </td>
                      <td className='whitespace-nowrap border-r px-6 py-4 font-bold text-left border-gray-300'>
                        Answer
                      </td>
                    </tr>
                    {faqArray?.length === 0 && !isTrue && (
                      <>
                        <tr className='border-b border-gray-300'>
                          <td className='whitespace-nowrap border-r px-6 py-4 font-medium border-gray-300'>
                            1
                          </td>
                          <td className=' border-r text-left px-6 py-4 border-gray-300'>
                            <input type='text' {...register('question1')} />
                          </td>
                          <td className='whitespace-nowrap border-r text-left px-6 py-4 border-gray-300'>
                            <input type='text' {...register('answer1')} />
                          </td>
                        </tr>
                        <tr className='border-b border-gray-300'>
                          <td className='whitespace-nowrap border-r px-6 py-4 font-medium border-gray-300'>
                            2
                          </td>
                          <td className=' border-r text-left px-6 py-4 border-gray-300'>
                            <input type='text' {...register('question2')} />
                          </td>
                          <td className='whitespace-nowrap border-r text-left px-6 py-4 border-gray-300'>
                            <input type='text' {...register('answer2')} />
                          </td>
                        </tr>
                      </>
                    )}

                    {faqs &&
                      isTrue &&
                      faqArray?.map((faq, i) => (
                        <tr
                          key={i++}
                          className='border-b border-gray-300'
                          colSpan='2'
                        >
                          <td className='whitespace-nowrap border-r px-6 py-4 font-medium border-gray-300'>
                            {++i}
                          </td>
                          <td className='whitespace-nowrap text-left border-r px-6 py-4 border-gray-300'>
                            <input
                              defaultValue={faq.question}
                              type='text'
                              {...register(`question${i + 2}`)}
                            />
                          </td>
                          <td className='whitespace-nowrap text-left border-r px-6 py-4 border-gray-300'>
                            <input
                              defaultValue={faq.answer}
                              type='text'
                              {...register(`answer${i + 2}`)}
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className='flex items-center gap-3 mt-6'>
            <button className='text-sm text-white px-5 bg-[#66B467] py-2 rounded-full'>
              Save
            </button>
          </div>
        </form>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        message={data}
        onClose={handleClose}
        className='muiclass'
      />
    </div>
  );
};

export default Chatbot_faq_details;
