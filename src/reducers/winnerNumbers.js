const winnerNumbers = (state = [], action) => {
    switch (action.type){
        case 'ADD_WINNER_NUMBER':
            return [
                ...state,
                {winnerNumber: action.winnerNumber}
            ]
        default:
            return state
    }
}

export default winnerNumbers