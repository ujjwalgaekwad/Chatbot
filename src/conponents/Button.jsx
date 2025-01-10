import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-gray-100',
    textColor = 'text-[#303030]',
    className = '',
    ...props
}) {
    return (
        <button className={`py-2 px-4 mt-4 rounded-md font-semibold transition ease-in duration-200 hover:bg-[#c9cac9] overflow-hidden ${bgColor} ${textColor} ${className}`} {...props}>{children}</button>
    )
}
export default Button;
