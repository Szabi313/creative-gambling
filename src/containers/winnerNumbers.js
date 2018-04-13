import { connect } from 'react-redux';
import { addWinnerNumber } from "../actions/index";
import WinnerNumbersComponent from "../winnerNumbersComponent";
import winnerNumbers from "../reducers/winnerNumbers";

const getWinnerNumbers = (winnerNumbers) => {
    return winnerNumbers;
}

const mapStateToProps = state => {
    return {
        winnerNumbers: getWinnerNumbers(state.winnerNumbers)
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         onSaveWinnerNumber:
//     }
// }

const WinnerNumbers = connect(
    mapStateToProps
)(WinnerNumbersComponent)