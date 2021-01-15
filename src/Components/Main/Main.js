import React, { useState, useEffect, useRef, useReducer } from 'react';
import './Main.css';
import Card from '../Card/Card'
import ScrollerIndex from '../ScrollerIndex/ScrollerIndex'
import BTC from '../../Images/BTC.png'
import ETH from '../../Images/ETH.png'
import LTC from '../../Images/LTC.svg'
const Main = () => {



    /*useEffect(() => {
        let websocket = new WebSocket("wss://ws-feed.pro.coinbase.com");
        setTimeout(function () {
            try {
                websocket.send(JSON.stringify(
                    {
                        type: "subscribe",
                        product_ids: [
                            "BTC-USD",
                            "ETH-USD",
                        ],
                        channels: [
                            {
                                name: "ticker",
                                product_ids: [
                                    "BTC-USD",
                                    "ETH-USD",
                                ]
                            }
                        ]
                    }
                ));
            }
            catch (e) { }

        }, 1000);


        websocket.onmessage = function (str) {
            let data = JSON.parse(str.data)
            try {
                if (data.product_id === "BTC-USD") {
                    setBTC({  name: "Bitcoin", short: "BTC",price: data.price, volume: data.volume_24h,image: "BTC" })
                }
                if (data.product_id === "ETH-USD") {
                    setETH({ name: "Ethereum", short: "ETH",price: data.price, volume: data.volume_24h,image: "ETH" })
                }

            }
            catch (e) { }

        };

        return () => websocket.close();
    }, []);*/


    let Cryptos = [
        {
            apiName:"BTC-USD",
            fullName:"Bitcoin",
            shortName:"BTC"
        },
        {
            apiName:"ETH-USD",
            fullName:"Ethereum",
            shortName:"ETH"
        },
        {
            apiName:"LTC-USD",
            fullName:"Litecoin",
            shortName:"LTC"
        }]//["BTC-USD", "Bitcoin", "BTC"], ["ETH-USD", "Ethereum", "ETH"], ["LTC-USD", "Litecoin", "LTC"]]
    let ScrollerCryptos = [
        {
            apiName:"",
            fullName:"",
            shortName:""
        }
    ]
    return (
        <div className="Main">
            <h1 style={{ color: "white" }}>
                Top Cryptos
            </h1>
            <div className="TopCryptos">
                {Cryptos.map((value) => (
                    <Card key={Math.random()} crypto={value} />
                ))}
            </div>
            <h1 style={{ color: "white" }}>
                Other Coins
            </h1>
            <div className="Scroller">
                <div className="MovementSection">
                    <div style={{ display: "flex", height: "100%" }}>
                        <img className="ScrollerImages" src={BTC}></img>
                        <img className="ScrollerImages" src={ETH}></img>
                        <img className="ScrollerImages" src={LTC}></img>
                        <img className="ScrollerImages" src={BTC}></img>
                        <img className="ScrollerImages" src={ETH}></img>
                        <img className="ScrollerImages" src={LTC}></img>
                        <img className="ScrollerImages" src={BTC}></img>
                        <img className="ScrollerImages" src={ETH}></img>
                        <img className="ScrollerImages" src={LTC}></img>
                        <img className="ScrollerImages" src={BTC}></img>
                        <img className="ScrollerImages" src={ETH}></img>
                        <img className="ScrollerImages" src={LTC}></img>
                    </div>

                </div>
            </div>
            <ScrollerIndex crypto={Cryptos[0]}/>

        </div>

    )

}

export default Main;
