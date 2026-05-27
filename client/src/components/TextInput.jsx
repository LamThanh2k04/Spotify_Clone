import React from 'react'
const TextInput = ({ label, type = 'text', value, onChange, placeholder, required = true, inputRef,className }) => {
    return (
        <div className='flex flex-col mt-[10px]'>
            <label className='font-bold'>{label}</label>
            <input
                type={type}
                value={type === 'file' ? undefined : value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                ref={inputRef}
                accept={type === 'file' ? 'image/*' : undefined}
                className= {className}
            />
        </div>
    )
}

export default TextInput
