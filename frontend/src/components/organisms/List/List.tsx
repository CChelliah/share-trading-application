import React from 'react'
//import ButtonGroup from '../../molecules/ButtonGroup'

export interface List {
    items?: any;
}

const items = 
[{
    "indicator": "MACD",
    "operator": "gt",
    "value": 3
},
{
    "indicator": "Stoch_Fastk",
    "operator": "gt",
    "value": 30
}]

const List = (props: List) => {
    const listItems = JSON.parse(JSON.stringify(items))
    return (
        <div>
            {items.map((item) => {
                return (
                    <div></div>
                    //<ButtonGroup indicator={item.indicator} operator={item.operator} value={item.value} />
                )
            })}
        </div>

    )
}

export default List;