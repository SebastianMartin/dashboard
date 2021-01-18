import portfolioReducer from './portfolio'

import { combineReducers } from 'redux'

const allReducers = combineReducers(
    {
        portfolio:portfolioReducer

    }
)
export default allReducers;