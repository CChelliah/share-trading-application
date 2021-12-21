import React from 'react'
//import StockFilter from '../../molecules/StockFilter'
import ButtonGroup from '../../molecules/ButtonGroup'

export interface Home {

}

const options = ["MACD", "OBV", "Stoch_Fastk"]

const Home = (props: Home) => {
    return(
        <div>
            <ButtonGroup />
        </div>
    )
}

export default Home
