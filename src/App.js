import React, { useState, useEffect, useRef, useReducer } from 'react';
import './App.css';
import { BrowserRouter, Link, Switch, Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Main from './Components/Main/Main'
import Header from './Components/Header/Header'
import Portfolio from './Components/Portfolio/Portfolio'


const App = (props) => {

	return (
		<BrowserRouter>
			<div className="App">
				<div className="TopHeader">
					<h1 >
						Dashboard
					</h1>
				</div>
				<Header />
				<Route path="/home" component={Main}/>
				<Route path="/portfolio" component={Portfolio}/>
				<Route exact path="/">
					<Redirect to="/home" />
				</Route>

				{/* <Route path="/home" component={Main}></Route>
					<Route exact path="/">
						<Redirect to="/home" />
					</Route> */}
			</div>
		</BrowserRouter>
	)

}

export default App;
