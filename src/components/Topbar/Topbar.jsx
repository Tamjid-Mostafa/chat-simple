import React from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {Link, NavLink} from "react-router-dom"
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
    const [showModal, setShowModal] = React.useState(false);

    const navigate = useNavigate();

    function handleBackRoute() {
      navigate(-1); // Go back one step in history
    }

  return (
    <>

    <section>
      <div>
        <div className="left_top flex justify-between items-center h-[50px] px-[20px] text-white bg-[#454545] ">
          <div>
          <Link onClick={handleBackRoute} to="/" className='duration-100 hover:opacity-80'>
            <ChevronLeftIcon /> Back
          </Link>
          </div>
          <div className='flex justify-end items-center gap-4'>
            <Link className='py-2 px-4 bg-[#625B71] rounded-full hover:opacity-75 duration-100'>
              <ChangeHistoryIcon className='rotate-90 ' style={{fontSize:"1.2rem", paddingBottom:"-2px"}} /> Preview
            </Link>

            <Link onClick={() => setShowModal(true)} to="#" className='py-2 px-5 bg-[#66B467] rounded-full hover:opacity-80 duration-100'>
              Publish
            </Link>
          </div>
        </div>
      </div>
    </section>
    <section>

      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Thank you . Your changes published !
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    If you have any question you talk or contact with us
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">

                  <button
                    className="bg-red-500 text-white active:bg-red-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </section>

    </>
  )
}

export default Topbar