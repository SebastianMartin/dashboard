import React, { useState, useEffect, useRef, useReducer } from 'react';
import './Card.css';
import BTC from '../../Images/BTC.png'
import ETH from '../../Images/ETH.png'
import LTC from '../../Images/LTC.svg'



const Card = ({ crypto }) => {
    const [state, setState] = useState({ price: 0, volume: 0 });
    const CardContainerFieldRef = useRef();
    const CardFieldRef = useRef();
    const iconFieldRef = useRef();
    const nameFieldRef = useRef();
    const shortNameAssetField = useRef();
    const priceAssetField = useRef();

    useEffect(() => {

        CardContainerFieldRef.current.addEventListener('mousemove', (event) => {
            var bounds = CardContainerFieldRef.current.getBoundingClientRect();
            //console.log(bounds)
            // console.log(window.innerWidth)
            // console.log(event.clientX)
            // console.log(bounds.left)
            // console.log(event.pageX)
            //console.log(event.pageX-bounds.left)
            let x = (window.innerWidth / 4 - (4 * event.clientX - 4 * bounds.left) / 1.5) / 50;
            let y = (window.innerHeight / 2 - (4 * event.clientY - 4 * bounds.top) / 1.5) / 50;
            try {
                CardFieldRef.current.style.transition = "none";
                CardFieldRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
            }
            catch (e) { }
        });
        CardContainerFieldRef.current.addEventListener('mouseenter', (event) => {
            try {
                CardFieldRef.current.style.transition = "all 0.5s ease";
                CardFieldRef.current.style.transition = "none";
                //move items up
                iconFieldRef.current.style.transform = "translateZ(200px) ";
                nameFieldRef.current.style.transform = "translateZ(125px)";
                shortNameAssetField.current.style.transform = "translateZ(100px)";
                priceAssetField.current.style.transform = "translateZ(75px)";
            }
            catch (e) { }
        });

        CardContainerFieldRef.current.addEventListener('mouseleave', (event) => {
            try {
                CardFieldRef.current.style.transition = "all 0.5s ease";
                CardFieldRef.current.style.transform = "none";
                //move items back down
                iconFieldRef.current.style.transform = "translateZ(0px)";
                nameFieldRef.current.style.transform = "translateZ(0px)";
                shortNameAssetField.current.style.transform = "translateZ(0px)";
                priceAssetField.current.style.transform = "translateZ(0px)";
            }
            catch (e) { }
        });

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
                        {crypto.fullName}
                    </h1>

                    <h2 ref={shortNameAssetField} className="CardShortName">
                        {crypto.shortName}
                    </h2>

                    <h1 ref={priceAssetField} className="CardPrice">{formatter.format(state.price)}</h1>
                </div>
            </div>
        </div>

    )

}

export default Card;
