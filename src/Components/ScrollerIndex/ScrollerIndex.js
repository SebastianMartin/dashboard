import React, { useState, useEffect, useRef, useReducer } from 'react';
import './ScrollerIndex.css';
import BTC from '../../Images/BTC.png'
import ETH from '../../Images/ETH.png'
import LTC from '../../Images/LTC.svg'
import BCH from '../../Images/BCH.png'
import XRP from '../../Images/XRP.webp'
import EOS from '../../Images/EOS.png'

import DASH from '../../Images/DASH.png'
import XLM from '../../Images/XLM.webp'





const ScrollerIndex = (props) => {
    const [state, setState] = useState({ price: 0, volume: 0 });
    const CardContainerFieldRef = useRef();
    const CardFieldRef = useRef();
    const iconFieldRef = useRef();
    const nameFieldRef = useRef();
    const shortNameAssetField = useRef();
    const priceAssetField = useRef();





    useEffect(() => {
        let websocket = new WebSocket("wss://ws-feed.pro.coinbase.com");
        websocket.addEventListener('open', function (event) {
            websocket.send(JSON.stringify(
                {
                    type: "subscribe",
                    product_ids: [
                        props.crypto.apiName
                    ],
                    channels: [
                        {
                            name: "ticker",
                            product_ids: [
                                props.crypto.apiName,
                            ]
                        }
                    ]
                }
            ));
        });
        /* setTimeout(function () {
             try {
                 
             }
             catch (e) {console.log(e) }
 
         }, 2000);*/


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
    switch (props.crypto.apiName) {
        case "BTC-USD":
            image = BTC;
            break;
        case "ETH-USD":
            image = ETH;
            break;
        case "LTC-USD":
            image = LTC;
            break;
        case "BCH-USD":
            image = BCH;
            break;
        case "XRP-USD":
            image = XRP;
            break;
        case "EOS-USD":
            image = EOS;
            break;
        case "DASH-USD":
            image = DASH;
            break;
        case "XLM-USD":
            image = XLM;
            break;
        default:
            image = BTC;

    }

    return (
        <div className="ScrollerIndexWrapper">
            <div className="ScrollerIndexContainer">
                <div className="ScrollerIndex">
                    <div className="ScrollerIndexIcon">
                        <img className="ScrollerIndexImage" src={image} alt="BTC" />
                    </div>

                    <div className="ScrollerIndexInfo">

                        <h2 className="ScrollerIndexShortName">
                            {props.crypto.shortName}
                        </h2>
                        <h1 className="ScrollerIndexName">
                            {props.crypto.fullName}
                        </h1>



                        <h1 className="ScrollerIndexPrice">{formatter.format(state.price)}</h1>
                    </div>
                    <div className="ScrollerIndexFavorites" onClick = {()=>props.addFavoriteClick(props.crypto)}>
                        <i className='fas fa-plus'></i>
                    </div>
                </div>
            </div>
        </div>

    )

}

export default ScrollerIndex;
