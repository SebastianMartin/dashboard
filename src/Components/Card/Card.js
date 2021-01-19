import React, { useState, useEffect, useRef, useReducer } from 'react';
import './Card.css';


const Card = (props) => {
    const [state, setState] = useState({ price: -1, volume: 0 });
    const CardContainerFieldRef = useRef();
    const CardFieldRef = useRef();
    const iconFieldRef = useRef();
    const nameFieldRef = useRef();
    const shortNameAssetField = useRef();
    const priceAssetField = useRef();
    const loadingAssetField1 = useRef();
    const loadingAssetField2 = useRef();
    const loadingAssetField3 = useRef();
    const loadingAssetField4 = useRef();

    useEffect(() => {

        CardContainerFieldRef.current.addEventListener('mousemove', (event) => {
            var bounds = CardContainerFieldRef.current.getBoundingClientRect();
            //console.log(bounds)
            // console.log(window.innerWidth)
            // console.log(event.clientX)
            // console.log(bounds.left)
            // console.log(event.pageX)
            //console.log(event.pageX-bounds.left)
            let x = (window.innerWidth / 4 - (4 * event.clientX - 4 * bounds.left) / 1.5) / 100;
            let y = (window.innerHeight / 2 - (4 * event.clientY - 4 * bounds.top) / 1.5) / 100;
            try {
                CardFieldRef.current.style.transition = "none";
                CardFieldRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
            }
            catch (e) { }
        });
        CardContainerFieldRef.current.addEventListener('mouseenter', (event) => {
            try {
                CardFieldRef.current.style.transition = "all 1s ease";
                CardFieldRef.current.style.transition = "none";
                //move items up
                iconFieldRef.current.style.transform = "translateZ(150px) ";
                nameFieldRef.current.style.transform = "translateZ(125px)";
                shortNameAssetField.current.style.transform = "translateZ(100px)";
                priceAssetField.current.style.transform = "translateZ(75px)";
            }
            catch (e) { }
        });

        CardContainerFieldRef.current.addEventListener('mouseleave', (event) => {
            try {
                CardFieldRef.current.style.transition = "all 1s ease";
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
        <div ref={CardContainerFieldRef} className="CardContainer">
            <div className="CardFavorites" onClick={() => { props.removeFavoriteClick(props.index) }} >
                <i className='fas fa-minus'></i>
            </div>
            <div ref={CardFieldRef} className="Card">
                <div ref={iconFieldRef} className="CardIcon">
                    <img className="CardIcon" src={'/Images/'+props.crypto.image} alt="BTC" />
                </div>
                {state.price == -1 ?
                    <div className="CardLoader">
                         <div className="CardLoaderOutside"></div>
                        <div className="CardLoaderInside1"></div>
                        <div className="CardLoaderInside2"></div>
                        <div className="CardLoaderInside3"></div> 
                    </div>

                    :
                    <div className="CardInfo">
                        <h2 ref={shortNameAssetField} className="CardShortName">
                            {props.crypto.shortName}
                        </h2>
                        <h1 ref={nameFieldRef} className="CardName">
                            {props.crypto.fullName}
                        </h1>

                        <h1 ref={priceAssetField} className="CardPrice">{formatter.format(state.price)}</h1>
                    </div>
                }






            </div>
        </div>

    )

}

export default Card;
