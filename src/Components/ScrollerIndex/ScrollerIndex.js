import React, { useState, useEffect, useRef, useReducer } from 'react';
import './ScrollerIndex.css';
import BTC from '../../Images/BTC.png'
import ETH from '../../Images/ETH.png'
import LTC from '../../Images/LTC.svg'




const ScrollerIndex = ({ crypto }) => {
    const [state, setState] = useState({ price: 0, volume: 0 });
    const CardContainerFieldRef = useRef();
    const CardFieldRef = useRef();
    const iconFieldRef = useRef();
    const nameFieldRef = useRef();
    const shortNameAssetField = useRef();
    const priceAssetField = useRef();





    useEffect(() => {
        let websocket = new WebSocket("wss://ws-feed.pro.coinbase.com");
        setTimeout(function () {
            try {
                websocket.send(JSON.stringify(
                    {
                        type: "subscribe",
                        product_ids: [
                            crypto.apiName
                        ],
                        channels: [
                            {
                                name: "ticker",
                                product_ids: [
                                    crypto.apiName,
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
                setState({ price: data.price, volume: data.volume_24h })
            }
            catch (e) { }

        };

        return () => websocket.close();
    }, []);



    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });
    let image = BTC
    if (crypto.apiName === "BTC-USD") {
        image = BTC
    }
    if (crypto.apiName === "ETH-USD") {
        image = ETH
    }
    if (crypto.apiName === "LTC-USD") {
        image = LTC
    }

    return (
        <div ref={CardContainerFieldRef} className="CardContainer">
            <div ref={CardFieldRef} className="Card">
                <div ref={iconFieldRef} className="CardIcon">
                    <img className="CardIcon" src={image} alt="BTC" />
                </div>
                <div className="CardInfo">


                    <h1 ref={nameFieldRef} className="CardName">
                        {crypto[1]}
                    </h1>

                    <h2 ref={shortNameAssetField} className="CardShortName">
                        {crypto[2]}
                    </h2>

                    <h1 ref={priceAssetField} className="CardPrice">{formatter.format(state.price)}</h1>
                </div>
            </div>
        </div>

    )

}

export default ScrollerIndex;
