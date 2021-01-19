import React, { useState, useEffect, useRef, useReducer } from 'react';
import './Portfolio.css';
import { useSelector, useDispatch } from 'react-redux'
import {
    updatePortfolio
} from '../../reduxActions/portfolio'

const Asset = (props) => {
    const dispatch = useDispatch()
    var portfolioState = useSelector(state => state.portfolio)
    const [state, setState] = useState({ price: -1, volume: 0 });
    const [editing, setEditing] = useState(false)
    const [amountOfCoins, setAmountOfCoins] = useState(props.coin.amount)
    useEffect(() => {
        let websocket = new WebSocket("wss://ws-feed.pro.coinbase.com");
        websocket.addEventListener('open', function (event) {
            websocket.send(JSON.stringify(
                {
                    type: "subscribe",
                    product_ids: [
                        props.coin.coin.apiName
                    ],
                    channels: [
                        {
                            name: "ticker",
                            product_ids: [
                                props.coin.coin.apiName,
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
                let tempCoins = JSON.parse(localStorage.getItem('portfolio'))
                for (let i = 0; i < tempCoins.length; i++) {
                    if (tempCoins[i].coin.apiName === props.coin.coin.apiName) {
                        tempCoins[i].value = parseFloat(data.price) * parseFloat(tempCoins[i].amount)
                    }
                }
                dispatch(updatePortfolio(tempCoins))
                localStorage.setItem('portfolio', JSON.stringify(tempCoins))
            }
            catch (e) { }
        };
        return () => websocket.close();
    }, []);
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });
    const updateAssetAmount = () => {
        let tempCoins = JSON.parse(localStorage.getItem('portfolio'))
        for (let i = 0; i < tempCoins.length; i++) {
            if (tempCoins[i].coin.apiName === props.coin.coin.apiName) {
                tempCoins[i].amount = amountOfCoins
            }
        }
        dispatch(updatePortfolio(tempCoins))
        localStorage.setItem('portfolio', JSON.stringify(tempCoins))
        setEditing(false)
    }
    const deleteAsset = () => {
        let tempCoins = JSON.parse(localStorage.getItem('portfolio'))
        for (let i = 0; i < tempCoins.length; i++) {
            if (tempCoins[i].coin.apiName === props.coin.coin.apiName) {
                tempCoins.splice(i, 1)
            }
        }
        dispatch(updatePortfolio(tempCoins))
        localStorage.setItem('portfolio', JSON.stringify(tempCoins))
        setEditing(false)
    }
    return (
        <div className="PortfolioAssetWrapper">
            <div className="PortfolioAssetContainer">
                <div className="PortfolioAsset">
                    <div className="PortfolioAssetIcon">
                        <img className="PortfolioAssetImage" src={'/Images/' + props.coin.coin.image} alt="BTC" />
                    </div>
                    <div className="PortfolioAssetInfo">
                        <h2 className="PortfolioAssetShortName">
                            {props.coin.coin.shortName}
                        </h2>
                        <div>{editing ?
                            <div className="PortfolioInputNumberUpdate">

                                <input
                                    className="PortfolioInputNumber"
                                    type="number"
                                    value={amountOfCoins}
                                    onChange={(e) => setAmountOfCoins(e.target.value)}
                                ></input>
                                <i className='fas fa-check' onClick={updateAssetAmount}></i>
                            </div>
                            :
                            <div>
                                {(props.coin.amount === 0) ?
                                    <button className="PortfolioAssetEditButton" onClick={() => setEditing(true)}><p>Add</p></button>
                                    :
                                    <h1 className="PortfolioAssetPrice" onClick={() => setEditing(true)}>{props.coin.amount}</h1>}

                            </div>
                        }

                        </div>

                        {state.price == -1 ?
                            <div className="PortfolioAssetLoader">
                                <div className="PortfolioAssetLoaderOutside"></div>
                                <div className="PortfolioAssetLoaderInside"></div>
                            </div> :
                            <h1 className="PortfolioAssetPrice">{formatter.format(state.price * props.coin.amount)}</h1>
                        }
                    </div>
                </div>
                <i className='fas fa-minus' onClick={deleteAsset}></i>
            </div>

        </div>
    )
}
const SearchIcon = (props) => {
    return (
        <div className="PortfolioSearchIcon"
            onClick={() => { props.select(props.coin) }}>
            <div className="PortfolioSearchIndexIcon">
                <img className="PortfolioSearchIndexImage" src={'/Images/' + props.coin.image} alt="BTC" />
            </div>
            <h2 className="PortfolioSearchShortName">
                {props.coin.shortName}
            </h2>
            <h2 className="PortfolioSearchFullName">
                {props.coin.fullName}
            </h2>
        </div>
    )

}
const Portfolio = (props) => {
    const dispatch = useDispatch()
    const portfolioState = useSelector(state => state.portfolio)

    const searchRef = useRef()

    const [newCryptoState, setNewCryptoState] = useState("")
    const [newCryptoAmount, setNewCryptoAmount] = useState("")
    const [newCryptoSelected, setnewCryptoSelected] = useState(false)


    const isSearched = (crypto) => {
        if (crypto.fullName.toLowerCase().includes(newCryptoState.toLowerCase())) {
            return true
        }
        if (crypto.shortName.toLowerCase().includes(newCryptoState.toLowerCase())) {
            return true
        }
        return false
    }
    const isChosen = (crypto) =>{
        let tempCoins = JSON.parse(localStorage.getItem('portfolio'))
        console.log(tempCoins)
        for (let i = 0; i < tempCoins.length; i++) {
            if (crypto.apiName === tempCoins[i].coin.apiName) {
                return false
            }
        }
        return true
    }
    let allCryptos = require('../../Data/coins')
    let filteredCryptos = []
    if (newCryptoState != "" && !newCryptoSelected) {
        filteredCryptos = allCryptos.filter(isSearched)
        filteredCryptos = filteredCryptos.filter(isChosen)
    }



    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });
    useEffect(() => {
        let tempCoins = JSON.parse(localStorage.getItem('portfolio')) || [
            // {
            //     coin: {
            //         apiName: "BTC-USD",
            //         fullName: "Bitcoin",
            //         shortName: "BTC",
            //         image: "BTC.png"
            //     },
            //     amount: 1.667,
            //     value: 0.0
            // },
            // {
            //     coin: {
            //         apiName: "ETH-USD",
            //         fullName: "Ethereum",
            //         shortName: "ETH",
            //         image: "ETH.png"
            //     },
            //     amount: 11.617,
            //     value: 0.0
            // },
            // {
            //     coin: {
            //         apiName: "LTC-USD",
            //         fullName: "Litecoin",
            //         shortName: "LTC",
            //         image: "LTC.svg"
            //     },
            //     amount: 32.25,
            //     value: 0.0
            // }
        ]
        localStorage.setItem('portfolio', JSON.stringify(tempCoins))
        dispatch(updatePortfolio(tempCoins))
    }, []);
    let CoinsSum = 0
    for (let i = 0; i < portfolioState.coins.length; i++) {
        try { CoinsSum += portfolioState.coins[i].value }
        catch (e) { CoinsSum = 0 }
    }
    const SelectCrypto = (Crypto) => {
        setNewCryptoState(Crypto.fullName)
        setnewCryptoSelected(true)
    }
    const SaveNewCrypto = () => {
        if (newCryptoSelected) {
            for (let i = 0; i < allCryptos.length; i++) {
                if (allCryptos[i].fullName === newCryptoState) {
                    let NewCoin = {
                        coin: allCryptos[i],
                        amount: 0,
                        value: 0
                    }
                    dispatch(updatePortfolio([]))
                    let tempCoins = [...portfolioState.coins]
                    tempCoins.push(NewCoin)
                    for (let j = 0; j < tempCoins.length; j++) {
                        tempCoins[j].value = 0
                    }
                    dispatch(updatePortfolio(tempCoins))
                    localStorage.setItem('portfolio', JSON.stringify(tempCoins))
                    setNewCryptoState("")
                }
            }

        }
    }






    return (
        <div className="PortfolioWrapper">
            <div className="PortfolioSum">
                <h1 style={{ color: "white", borderBottom: "solid white 1px" }}>Portfolio Value</h1>
                <h1 style={{ color: "white"}}>{formatter.format(CoinsSum)}</h1>
            </div>
            <div className="Portfolio">

                <div className="PortfolioAssets">
                    {portfolioState.coins.length > 0 ?
                        <div className="PortfolioAssetWrapper">
                            <div className="PortfolioAssetContainer" style={{height:"50px"}}>
                                <div className="PortfolioAsset">
                                    <div style={{ width: "100px" }} className="PortfolioAssetIcon">
                                    </div>
                                    <div className="PortfolioAssetInfo">
                                        <h1 className="PortfolioAssetShortName">
                                            Crypto:                                </h1>
                                        <h1 className="PortfolioAssetPrice">Amount:</h1>
                                        <h1 style={{ justifySelf: "center" }} className="PortfolioAssetPrice">Value:</h1>

                                    </div>
                                </div>
                            </div>
                        </div> :
                        <div />
                    }
                    {/* <div className="PortfolioAssetWrapper">
                        <div className="PortfolioAssetContainer">
                            <div className="PortfolioAsset">
                                <div style={{ width: "100px" }} className="PortfolioAssetIcon">
                                </div>
                                <div className="PortfolioAssetInfo">
                                    <h2 className="PortfolioAssetShortName">
                                        Crypto:                                </h2>
                                    <h1 className="PortfolioAssetPrice">Amount Owned</h1>
                                    <h1 style={{ justifySelf: "center" }} className="PortfolioAssetPrice">Value</h1>

                                </div>
                            </div>
                        </div>
                    </div> */}
                    {portfolioState.coins.map((value) => (
                        <Asset coin={value} />
                    ))}
                </div>
                <div className="PortfolioAddNewCoinWrapper">
                    <div className="PortfolioAddNewCoin">
                        <p style={{ gridColumn: "1/5", borderBottom: "solid var(--green) 2px" }}>Add a New Crypto</p>
                        <div style={{ gridColumn: "1/4" }}>
                            <input
                                ref={searchRef}
                                className="PortfolioInput"
                                type="text"
                                placeholder="Search for a crypto"
                                value={newCryptoState}
                                onChange={(e) => (setNewCryptoState(e.target.value), setnewCryptoSelected(false))}
                            ></input>
                            <div className="PortfolioInputDropDown">
                                {filteredCryptos.map((value) => (
                                    <SearchIcon coin={value} select={SelectCrypto}></SearchIcon>
                                ))}

                            </div>

                        </div>
                        <i className='fas fa-plus' onClick={SaveNewCrypto}></i>
                    </div>

                </div>


            </div>
        </div>

    )

}

export default Portfolio;
