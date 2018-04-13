import React from 'react';
import ReactDOM from 'react-dom';
import StartButton from './StartButton';


describe("StartButton component", () => {

    const test_div = document.createElement('div')
    const mockCallback = jest.fn()
        .mockImplementation(() => {
            started = true;
        });
    const startButton = ReactDOM.render(<StartButton show="true" onClick={mockCallback}/>, test_div)
    let started = false

    test('rendering', () => {
        expect(typeof startButton).toBe('object')
    })

    test('onCLick', () => {
        expect(started).toBeFalsy()
        startButton.handleClickStart()
        expect(mockCallback.mock.calls.length).toBe(1)
        expect(started).toBeTruthy()
    })

})