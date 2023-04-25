import React from 'react'
import cn from 'clsx'
import s from "../styles/Login.module.css";
import vector from '../assets/images/Others/vector_login_page.png'
import facebook from '../assets/images/svg/facebook.svg'

const DemoLogin = () => {
    return (
        <div className={cn(s.root, 'min-h-screen overflow-hidden')}>

            <div className={cn(s.heading_content, '')}>
                <h1 className={cn(s.heading)}>
                    ChatSimple
                </h1>
                <p className='text-[28px] font-[400] w-[457px] h-[72px]'>
                    Equip your business with ChatGPT under 10 minutes
                </p>
            </div>

            <div className={cn(s.login_card)}>
                <h4 className='font-bold text-[28px]'>Welcome</h4>
                <p>Log in to Facebook to continue</p>
                <button className='py-3 px-2 flex items-center gap-3 font-normal text-[18px] shadow border rounded-lg'>
                    <img src={facebook} alt="" />
                    <span>Continue with Facebook</span>
                </button>
            </div>

            <img src={vector} alt="" className={cn(s.vector)} />

        </div>
    )
}

export default DemoLogin