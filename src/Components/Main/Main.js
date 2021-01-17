import React, { useState, useEffect, useRef, useReducer } from 'react';
import './Main.css';
import Card from '../Card/Card'
import ScrollerIndex from '../ScrollerIndex/ScrollerIndex'
import BTC from '../../Images/BTC.png'
import ETH from '../../Images/ETH.png'
import LTC from '../../Images/LTC.svg'
const Main = () => {
    const [favState, setFavState] = useState({faves:{}})
    let Cryptos = JSON.parse(localStorage.getItem('favorites')) || [{
        apiName: "BTC-USD",
        fullName: "Bitcoin",
        shortName: "BTC"
    },
    {
        apiName: "ETH-USD",
        fullName: "Ethereum",
        shortName: "ETH"
    }]//["BTC-USD", "Bitcoin", "BTC"], ["ETH-USD", "Ethereum", "ETH"], ["LTC-USD", "Litecoin", "LTC"]]
    useEffect(() => {
       
        setFavState({faves:Cryptos})
       
    }, []);
    const addFavorite = (value) => {
        Cryptos.push(value)
        setFavState({faves:Cryptos})
        localStorage.setItem('favorites', JSON.stringify(Cryptos))
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
    }
    const removeFavorite = (index) => {
        Cryptos.splice(index,1);
        setFavState({faves:Cryptos})
        localStorage.setItem('favorites', JSON.stringify(Cryptos))
    }


   
    let ScrollerCryptos = [
        {
            apiName: "BTC-USD",
            fullName: "Bitcoin",
            shortName: "BTC"
        },
        {
            apiName: "ETH-USD",
            fullName: "Ethereum",
            shortName: "ETH"
        },
        {
            apiName: "LTC-USD",
            fullName: "Litecoin",
            shortName: "LTC"
        },
        {
            apiName: "BCH-USD",
            fullName: "Bitcoin Cash",
            shortName: "BCH"
        },
        {
            apiName: "XRP-USD",
            fullName: "XRP",
            shortName: "XRP"
        },
        {
            apiName: "EOS-USD",
            fullName: "EOS",
            shortName: "EOS"
        },
        {
            apiName: "DASH-USD",
            fullName: "DASH",
            shortName: "DASH"
        },
        {
            apiName: "XLM-USD",
            fullName: "Stellar",
            shortName: "XLM"
        }
    ]

    return (
        <div className="Main">
            <h1 style={{ color: "white" }}>
                Your favorite cryptos
            </h1>
            <div className="TopCryptos">
                {Cryptos.map((value,index) => (
                    <Card key={Math.random()} removeFavoriteClick={removeFavorite} crypto={value} index={index} />
                ))}
            </div>
            <h1 style={{ color: "white" }}>
                Other Coins
            </h1>
            <div className="ScrollerCryptos">
                {ScrollerCryptos.map((value) => (
                    <div>
                        <ScrollerIndex key={Math.random()} addFavoriteClick={addFavorite} crypto={value} />
                    </div>

                ))}
            </div>


        </div>

    )

}

export default Main;
