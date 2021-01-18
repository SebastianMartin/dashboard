import React, { useState, useEffect, useRef, useReducer } from 'react';
import './ScrollerIndex.css';




const ScrollerIndex = (props) => {
    const [state, setState] = useState({ price: -1, volume: 0 });

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
    return (
        <div className="ScrollerIndexWrapper">
            <div className="ScrollerIndexContainer">
                <div className="ScrollerIndex">
                    <div className="ScrollerIndexIcon">
                        <img className="ScrollerIndexImage" src={'/Images/'+props.crypto.image} alt="BTC" />
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
