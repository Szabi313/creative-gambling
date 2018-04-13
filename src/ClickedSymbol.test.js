import React from 'react'
import ClickedSymbol from './ClickedSymbol';
import ReactDOM from 'react-dom';

describe('ClickedSymbol', () => {

    const test_div = document.createElement('div');
    const clickedSymbol = ReactDOM.render(<ClickedSymbol />, test_div)

    test("rendering", () => {
        expect(typeof clickedSymbol).toBe('object')
        expect(clickedSymbol.state.hasOwnProperty('show')).toBeTruthy()
        expect(clickedSymbol.state.show).toBeFalsy()
    })
})