import React from 'react';
import ReactDOM from 'react-dom';
import Instructions from "./Instructions";


describe("Instructions", () => {
    it("renders Instructions", () => {
        const test_div = document.createElement('div');
        const config = {
            symbolsToBeChoosen: 1000,
            symbolsNumToWin: 10
        }
        let inst = ReactDOM.render(<Instructions name="Szabi" gameConfig={config}/>, test_div);

        expect(typeof inst.props.gameConfig).toBe('object')
        expect(typeof inst.props.name).toBe('string')
        expect(inst.props.gameConfig.symbolsNumToWin).toBeDefined()
        expect(inst.props.gameConfig.symbolsToBeChoosen).toBeDefined()
    })

})