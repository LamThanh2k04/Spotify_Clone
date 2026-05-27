
import React from 'react'

const Button = ({type, className, label}) => {
    return (
        
            <button
                type={type}
                className = {className}
            >
                {label}
            </button>
        
    )
}

export default Button