import React, { useEffect, useState } from "react";
import "./HomePageV2.css";
// import AddChannelButton from '../../components/Buttons/AddChannelButton';
import MessengerImage from "../../assets/images/svg/messenger.svg";
import InstaImage from "../../assets/images/svg/instagram.png";
import barIcon from "../../assets/images/svg/barIcon.svg";
import CalenderIcon from "../../assets/images/svg/Calender.svg";
import ArrowLeftIcon from "../../assets/images/svg/ArrowLeft.svg";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import ChartContainerIcon from "../../assets/images/svg/Chart.svg";
import ChartMapIcon from "../../assets/images/svg/ChartMap.png";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "../../redux/reducers/userSlice";
import PopUp from "../PopUp/PopUp";
import AddChannel from "../AddChannel/AddChannel";
import AddChannelButton from "../Buttons/AddChannelButton";
import { allChannels, createChannel } from "../../redux/reducers/userPlatformSlice";
import { v4 as uuidv4 } from 'uuid';
import facebook from "../../assets/images/svg/messenger.svg";
import instagram from "../../assets/images/svg/instagram.png";
import whatsapp from "../../assets/images/svg/WhatsApp.svg"
import ActionAlert from '../Alert/ActionAlert';
import { CircularProgress } from "@mui/material";
import BotTask from "../BotTask/BotTask";
import MostActive from "../MostActive/MostActive";
import ActiveCountries from "../ActiveCountries/ActiveCountries";
import Reports from "../Reports/Reports";
import ChannelCard from "../ChannelCard/ChannelCard";
// this file

export default function HomePageV2({ changeDashboardTab, user }) {

  const dispatch = useDispatch();
  // const { fbUserID } = useSelector((state) => state.fb);
  // const { user } = useSelector((state) => state.user);
  const { channels, loading } = useSelector((state) => state.channel);

  const [showAlert, setShowAlert] = useState(false);

  console.log(channels)

  useEffect(() => {
    const data = {
      userID: user?.user_id,
      pageToken: {
        page_token: { last_time: new Date().toISOString().split('T')[0] },
      },
    };
    dispatch(userDetails(user?.user_id));
    dispatch(allChannels(data));
  }, [user?.user_id]);
  // useEffect(() => {
  //   dispatch(userDetails(fbUserID));
  // }, [fbUserID]);

  const [isOpen, setIsOpen] = useState()


  const channelHandler = (name) => {
    // for channel creation
    const data = {
      userID: user?.user_id,
      platform_id: uuidv4(),
      platformDetails: {
        platform_type: name,
        access_token: "none",
        permissions: {
          access_to_account: "no"
        },
        chatbot_id: "none",
      }
    };
    dispatch(createChannel(data));
    setShowAlert(true)
  };
  useEffect(() => {
    const data = {
      userID: user?.user_id,
      pageToken: {
        page_token: { last_time: new Date().toISOString().split('T')[0] },
      },
    };
    if (loading) {
      dispatch(allChannels(data));
    }
  }, [loading]);

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen w-[70vh]'>
        <CircularProgress />
      </div>
    )
  }

  return (
    <>

      <main className="chat__simple__main2 p-5">
        <div className="chat__simple__container">
          <h1>{user?.first_name
            ?
            `${user?.first_name}!`
            :
            'Anonymous'
          }</h1>
          <div className="small__two__connextios__row">
            <span>{channels?.length || '0'} connected channels</span>
            {/* <span>838 contacts</span> */}
          </div>
          <div className="active__channel__row mb-8">
            <h4>Active Channels</h4>
          </div>

          <div className="grid  xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10">

            {
              channels?.user_platforms?.map((item, i) => {
                return (
                  <ChannelCard item={item} key={i} />
                )
              })
            }

            <div style={{ width: '262px', height: '229px' }}
              onClick={() => setIsOpen(!isOpen)}
              className="cards_three cursor-pointer border-2 border-dashed rounded-lg p-5 flex justify-center items-center">
              <h5>+ Add channel</h5>
            </div>
            <PopUp
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            >
              <AddChannel
                channelHandler={channelHandler}
                setIsOpen={setIsOpen}
                user={user}
                setShowAlert={setShowAlert}
              />
            </PopUp>
          </div>
          <Reports />
          <div className="grid lg:grid-cols-3 md:grid-col-2 grid-cols-1 gap-x-5 gap-y-5">
            <BotTask />
            <MostActive />
            <ActiveCountries />
          </div>
        </div>
        {showAlert && <ActionAlert severity="success" message={"Channel Created"}></ActionAlert>}
      </main>
    </ >
  );
}