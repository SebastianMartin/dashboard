import React, { useState, useEffect } from 'react';
import './Header.css';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom'

const Header = (props) => {


    let hdrValues = [
        {
            name: "Home",
            value: "home"
        },
        {
            name: "Teaching",
            value: "teaching"
        },
        {
            name: "Resume",
            value: "resume"
        },
        {
            name: "Dissertation",
            value: "dissertation"
        },
        // {
        //     name: "Contact",
        //     value: "contact"
        // },
    ]



        return (
            <div className="HeaderContainer">
                <div className="HeaderButtonContainer">
                    {hdrValues.map((value) => (
                        <Link key={Math.random()} to={"/" + value.value}>
                            <button
                                className="HeaderButton"
                                onClick={() => (document.body.scrollTop = 0, document.documentElement.scrollTop = 0)}
                                value={value.value}>
                                {value.name}
                            </button>
                        </Link>
                    ))}
                </div>


            </div>
        );






}
export default Header;