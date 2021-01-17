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
import OXT from '../../Images/OXT.svg'

import MKR from '../../Images/MKR.png'
import ATOM from '../../Images/ATOM.png'
import XTZ from '../../Images/XTZ.png'
import ETC from '../../Images/ETC.png'
import OMG from '../../Images/OMG.png'
import ZEC from '../../Images/ZEC.png'
import LINK from '../../Images/LINK.png'
import REP from '../../Images/REP.png'
import ZRX from '../../Images/ZRX.png'
import ALGO from '../../Images/ALGO.png'
import DAI from '../../Images/DAI.png'
import KNC from '../../Images/KNC.png'
import COMP from '../../Images/COMP.svg'
import BAND from '../../Images/BAND.png'
import NMR from '../../Images/NMR.webp'
import CGLD from '../../Images/CGLD.png'
import UMA from '../../Images/UMA.png'
import LRC from '../../Images/LRC.png'
import YFI from '../../Images/YFI.svg'
import UNI from '../../Images/UNI.png'
import REN from '../../Images/REN.webp'
import BAL from '../../Images/BAL.png'
import WBTC from '../../Images/WBTC.png'
import NU from '../../Images/NU.png'
import FIL from '../../Images/FIL.png'
import AAVE from '../../Images/AAVE.png'
import GRT from '../../Images/GRT.png'
import BNT from '../../Images/BNT.svg'
import SNX from '../../Images/SNX.png'



const ScrollerIndex = (props) => {
    const [state, setState] = useState({ price: -1, volume: 0 });
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
        case "OXT-USD":
            image = OXT;
            break;
        case "MKR-USD":
            image = MKR;
            break;
        case "ATOM-USD":
            image = ATOM;
            break;
        case "XTZ-USD":
            image = XTZ;
            break;
        case "ETC-USD":
            image = ETC;
            break;
        case "OMG-USD":
            image = OMG;
            break;
        case "ZEC-USD":
            image = ZEC;
            break;
        case "LINK-USD":
            image = LINK;
            break;
        case "REP-USD":
            image = REP;
            break;
        case "ZRX-USD":
            image = ZRX;
            break;
        case "ALGO-USD":
            image = ALGO;
            break;
        case "DAI-USD":
            image = DAI;
            break;
        case "KNC-USD":
            image = KNC;
            break;
        case "COMP-USD":
            image = COMP;
            break;
        case "BAND-USD":
            image = BAND;
            break;
        case "NMR-USD":
            image = NMR;
            break;
        case "CGLD-USD":
            image = CGLD;
            break;
        case "UMA-USD":
            image = UMA;
            break;
        case "LRC-USD":
            image = LRC;
            break;
        case "YFI-USD":
            image = YFI;
            break;
        case "UNI-USD":
            image = UNI;
            break;
        case "REN-USD":
            image = REN;
            break;
        case "BAL-USD":
            image = BAL;
            break;
        case "WBTC-USD":
            image = WBTC;
            break;
        case "NU-USD":
            image = NU;
            break;
        case "FIL-USD":
            image = FIL;
            break;
        case "AAVE-USD":
            image = AAVE;
            break;
        case "GRT-USD":
            image = GRT;
            break;
        case "BNT-USD":
            image = BNT;
            break;
        case "SNX-USD":
            image = SNX;
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
                        {state.price == -1 ?
                            <div className="ScrollerIndexLoader">
                                <div className="ScrollerIndexLoaderOutside"></div>
                                <div className="ScrollerIndexLoaderInside"></div>
                            </div> :
                            <h1 className="ScrollerIndexPrice">{formatter.format(state.price)}</h1>
                        }
                    </div>
                    <div className="ScrollerIndexFavorites" onClick={() => props.addFavoriteClick(props.crypto)}>
                        <i className='fas fa-plus'></i>
                    </div>
                </div>
            </div>
        </div>

    )

}

export default ScrollerIndex;
