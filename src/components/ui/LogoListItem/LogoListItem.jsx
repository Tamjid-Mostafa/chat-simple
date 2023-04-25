import React from 'react'
import CustomSwitch from '../IOSSwitch/IOSSwitch'
import cn from 'clsx'
import s from './LogoListItem.module.css'

const LogoListItem = ({
    children,
    handleClick,
    platform,
    checked,
    ...rest
}) => {

    return (
        <div
            onClick={() => handleClick(platform)}
            className={cn(s.root)}
        >
            <div
                className={cn(s.container)}
            >
                {children}
            </div>
            <div className=''>
                <CustomSwitch
                    checked={checked}
                    onClick={() => handleClick(platform)}
                    {...rest}
                />
            </div>
        </div>
    )
}

export default LogoListItem