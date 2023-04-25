import React from 'react'
import CustomSwitch from '../IOSSwitch/IOSSwitch'
import cn from 'clsx'
import s from './ListItem.module.css'

const ListItem = ({
    children,
    handleClick,
    id,
    checked,
    ...rest
}) => {

    return (
        <div
            onClick={() => handleClick(id)}
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
                    {...rest}
                />
            </div>
        </div>
    )
}

export default ListItem