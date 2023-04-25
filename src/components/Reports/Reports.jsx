import React from 'react'
import CalenderIcon from '../../assets/images/svg/Calender.svg'
import ArrowLeftIcon from '../../assets/images/svg/ArrowLeft.svg'
const Reports = () => {
    return (
        <>
            <div className="reports__hading">
                <h3>Reports</h3>
            </div>
            <div className="starts__date__end__date">
                <div className="first__input">
                    <input type="text" placeholder="10-02-2023" />
                    <img src={CalenderIcon} alt="" />
                </div>
                <button className="bg-[#EEF8F0] w-[48px] h-[46px]">
                    <img src={ArrowLeftIcon} alt="" />
                </button>
                <div className="first__input">
                    <input type="text" placeholder="30-03-2023" />
                    <img src={CalenderIcon} alt="" />
                </div>
            </div>
            <div className="boxes__grid__sec">
                <div className="card">
                    <h6>Total contacts</h6>
                    <div className="flex justify-between items-center">
                        <h5>838</h5>
                        <div className="percent">+2.5%</div>
                    </div>
                </div>
                <div className="card">
                    <h6>New Contacts</h6>
                    <div className="flex justify-between items-center">
                        <h5>23</h5>
                        <div className="bg-[#F9DEDC] rounded-full px-4 py-1 text-sm">
                            -1.2%
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reports