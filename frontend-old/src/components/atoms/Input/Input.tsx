import React, { useState, useEffect }from 'react'


export interface Input {
    placeholder?: string;
    text?: string;
    onClick?: () => void;
    value?: string;
    title?: string;
}

const Input = (props: Input) => {
    const [stateValue, setValue] = useState(props.value)
    const handleOnChange = (value : any) => {
        setValue(value)
        console.log(stateValue)
    }
    return (
        <div>
            <label>{props.title}</label>
            <input placeholder={props.placeholder} onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
            handleOnChange(e.target.value)
        }}/>
        </div>
    )
}

export default Input;