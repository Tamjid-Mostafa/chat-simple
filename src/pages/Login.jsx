import s from "../styles/Login.module.css";
import FacebookLogin from "react-facebook-login";
import { useState } from "react";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import React from 'react'
import cn from 'clsx'
import vector from '../assets/images/Others/vector_login_page.png'
import facebook from '../assets/images/svg/facebook.svg'
import {
  facebookSignIn,
  facebookSignUp,
  facebookToken,
} from "../redux/reducers/facebookSlice";
import { userDetails } from "../redux/reducers/userSlice";
import uuid from 'react-uuid';

// this file

const Login = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.user);
  // c646927d6ea94965fde505bbae64d1ae
  // 757731156080550

  const responseFacebook = async (response) => {
    const res = await dispatch(
      facebookSignUp({
        facebook_access_token: response?.accessToken,
        first_name: response?.name,
        last_name: "",
        user_fb_id: response?.userID,
        user_type: "USER",
        email: response?.email,
        password: "",
        timezone: "UTC",
        uuid: uuid()
      })
    );
    let user_id_return = res.payload.user_id;
    dispatch(userDetails(user_id_return));
    navigate("/dashboard");
  };
  const componentCliked = (response) => {
    console.warn(response);
  };

  return (
    // <div className={styles.desktop1}>

    //   <b className={styles.chatSimple}>ChatSimple</b>

    //   <div className={styles.welcomeBackPlease}>
    //     <FacebookLogin
    //       appId="139596095408301"
    //       autoLoad={false}
    //       fields="name,email,picture"
    //       onClick={componentCliked}
    //       callback={responseFacebook}
    //     />
    //     {/* <FacebookLogin
    //       appId="6313418292042640"
    //       autoLoad={false}
    //       fields="name,email,picture"
    //       callback={responseFacebook}
    //       onClick={componentCliked}
    //       cssclassName={styles.btnFacebook}
    //       icon="fa-facebook"
    //       render={(renderProps) => (
    //         <button onClick={renderProps.onClick}>
    //           &nbsp; New Login in with Facebook
    //         </button>
    //       )}
    //     /> */}
    //   </div>
    //   <b className={styles.artificialIntelligenceDrivinContainer}>
    //     <p className={styles.resultsForThe}>
    //       Equip your business with ChatGPT
    //       <br /> Get your chatbot under 30mins
    //     </p>
    //   </b>


    //   <div className={styles.rectangleDiv} />
    //   {/* <img
    //     className={styles.clipMessageSent1Icon}
    //     alt=""
    //     src="/screen.png"
    //   /> */}

    //   {loggedIn && <Profile user={user} />}
    // </div>
    <>
      <div className={cn(s.root, 'min-h-screen')}>

        <div className="container mx-auto lg:px-48 sm:px-24 px-16 flex sm:flex-row flex-col  items-center justify-between h-screen">
          <div className={cn(s.heading_content, 'sm:-mt-64 mt-auto mb-8')}>
            <h1 className={cn(s.heading)}>
              ChatSimple
            </h1>
            <p className='text-[28px] font-[400] w-[457px] h-[72px]'>
              Equip your business with ChatGPT under 10 minutes
            </p>
          </div>

          <div className={cn(s.login_card, 'z-10')}>
            <h4 className='font-bold text-[28px]'>Welcome</h4>
            <p>Log in to Facebook to continue</p>

            {/* <button className='py-3 px-2 flex items-center gap-3 font-normal text-[18px] shadow border rounded-lg'>
            <img src={facebook} alt="" />
            <span>Continue with Facebook</span>
          </button> */}
            <FacebookLogin
              appId="139596095408301"
              autoLoad={false}
              fields="name,email,picture"
              onClick={componentCliked}
              callback={responseFacebook}
              cssClass={"py-3 px-6 flex items-center gap-3 font-normal text-[18px] shadow border rounded-lg text-[#0073ff]"}
              icon={<img src={facebook} alt="" />}
            />
          </div>
        </div>

        <img src={vector} alt="" className={cn(s.vector)} />

      </div>
    </>
  );
};

export default Login;