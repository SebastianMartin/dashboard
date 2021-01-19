import React, { useState, useEffect, useRef, useReducer } from 'react';
import './Main.css';
import Card from '../Card/Card'
import ScrollerIndex from '../ScrollerIndex/ScrollerIndex'
import BTC from '../../Images/BTC.png'
import ETH from '../../Images/ETH.png'
import LTC from '../../Images/LTC.svg'
const Main = () => {
    const [favState, setFavState] = useState({ faves: [] })
    const [searchState, setSearchState] = useState("")
    useEffect(() => {
        setFavState({
            faves: JSON.parse(localStorage.getItem('favorites')) || [{
                apiName: "BTC-USD",
                fullName: "Bitcoin",
                shortName: "BTC",
                image: "BTC.png"
            },
            {
                apiName: "ETH-USD",
                fullName: "Ethereum",
                shortName: "ETH",
                image: "ETH.png"
            }]
        })
    }, []);
    const addFavorite = (value) => {
        let Cryptos = [...favState.faves]
        Cryptos.push(value)
        setFavState({ faves: Cryptos })
        localStorage.setItem('favorites', JSON.stringify(Cryptos))
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
    }
    const removeFavorite = (index) => {
        let Cryptos = [...favState.faves]
        Cryptos.splice(index, 1);
        setFavState({ faves: Cryptos })
        localStorage.setItem('favorites', JSON.stringify(Cryptos))
    }


    const inFaves = (crypto) => {
        for (let i = 0; i < favState.faves.length; i++) {
            if (crypto.apiName === favState.faves[i].apiName) {
                return false
            }
        }
        return true
    }
    const isSearched = (crypto) => {
        if(crypto.fullName.toLowerCase().includes(searchState.toLowerCase()) ){
            return true
        }
        if(crypto.shortName.toLowerCase().includes(searchState.toLowerCase()) ){
            return true
        }
        return false
    }

    let ScrollerCryptos = require('../../Data/coins')
    ScrollerCryptos = ScrollerCryptos.filter(inFaves)
    ScrollerCryptos = ScrollerCryptos.filter(isSearched)
    return (
        <div className="Main">
            <h1 style={{ color: "white" }}>
                Your favorite cryptos:
            </h1>
            <div className="TopCryptos">
                {favState.faves.map((value, index) => (
                    <Card key={Math.random()} removeFavoriteClick={removeFavorite} crypto={value} index={index} />
                ))}
            </div>
            <h1 style={{ color: "white" }}>
                Other Cryptos
            </h1>
            <br></br>
            <div className="CryptoSearch" >
                <input
                    className="CryptoSearchInput"
                    type="text"
                    placeholder="Search for a crypto"
                    value={searchState}
                    onChange={(e)=>setSearchState(e.target.value)}
                ></input>
                {!(searchState!="")?<div/>: <i className='fas fa-close' onClick={()=>setSearchState("")}></i>}
               
            </div>

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
