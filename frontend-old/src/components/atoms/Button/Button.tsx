import React from 'react'

export interface Button {
    text?: string;
    onClick?: () => void;
}

const Button = (props: Button) => {
    return (
        <div className="flex flex-1">
            <button onClick={props.onClick}>{props.text}</button>
        </div>
    )
}

export default Button;