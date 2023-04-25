import React from 'react'
import facebook from "../../assets/images/svg/messenger.svg";
import instagram from "../../assets/images/svg/instagram.png";
import barIcon from "../../assets/images/svg/barIcon.svg";

const ChannelCard = ({ item }) => {
    return (
        <>
            <div style={{ width: '262px', height: '229px' }} className="border p-5 rounded-lg mb-2">
                <div className="header flex justify-between items-center mb-5">
                    <div className="flex items-center gap-3">
                        <img src={item.platform_type === 'PlatformType.MESSENGER' ? facebook : instagram} alt="" className="w-12 h-12" />
                        <h4>{item.platform_type === 'PlatformType.MESSENGER' ? "Facebook" : 'Instagram'}</h4>

                    </div>
                    <div>
                        <img src={barIcon} className="cursor-pointer" alt="" />
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }} className="bars__text">
                    <span className="text-sm font-medium">Active contact</span>
                    <span className="text-sm text-green-500">376/508</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{ width: "30%" }}
                    ></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }} className="bars__texts">
                    <span className="text-sm font-medium">
                        Total number of message
                    </span>
                    <span className="text-sm text-green-500">2,109</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{ width: "49%" }}
                    ></div>
                </div>
            </div>
        </>
    )
}

export default ChannelCard