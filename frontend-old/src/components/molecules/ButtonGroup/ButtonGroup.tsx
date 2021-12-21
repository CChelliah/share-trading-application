import React from 'react'
import Button from '../../atoms/Button'
import Input from '../../atoms/Input'
import Select from '../../atoms/Select'

export interface ButtonGroup {
    text?: string;
    onClick?: () => void;
}

const ButtonGroup = (props: ButtonGroup) => {
    return (
        <div className="flex flex-row">
            <Select/>
            <Input />
            <Input />
            <Button text="Delete" />
        </div>
    )
}

export default ButtonGroup;