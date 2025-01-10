import React, { useId, forwardRef } from 'react'

function Input({
    label,
    type = 'text',
    className = '',
    ...props
}, ref) {
    const id = useId();
    return (
        <div className=''>
            {label && <label htmlFor={id} className='text-gray-200'>{label}</label>}
            <input
                className={`bg-transparent border-[#505050] rounded-md border-2 w-full px-3 py-2 mt-4  ${className} flex justify-center items-center`}
                {...props}
                id={id}
                type={type}
                ref={ref} />
        </div>
    )
}

export default forwardRef(Input);
