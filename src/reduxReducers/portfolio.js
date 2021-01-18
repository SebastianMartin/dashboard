
let portfolioState = {
    coins:[]
}

const portfolioReducer = (state = portfolioState, action) => {
    switch (action.type) {
        case "UPDATE_PORTFOLIO":
            return {
                ...state,
               coins: action.payload
            }
        default:
            return state
    }
}
export default portfolioReducer;