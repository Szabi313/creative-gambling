import React from 'react'
import Board from './Board';
import ReactDOM from 'react-dom';


describe("board", () => {

    const test_div = document.createElement('div');
    let clickedImgs = [{src: 1, num: 2}];
    const playingImgs = ['abc', 'def', 'hij'];
    let board;

    beforeEach(() => {
        board = ReactDOM.render(<Board show="true" clickedImgs={clickedImgs} playingImgs={playingImgs}>  </Board>, test_div)
        //board = new Board();
    })



    test("renders board", () =>
        {
            const spy = jest.spyOn(board, 'render')
            board = ReactDOM.render(<Board show="true" clickedImgs={clickedImgs} playingImgs={playingImgs}>  </Board>, test_div)
            expect(spy).toHaveBeenCalled();
        }
    )

    test("clickedImg", () => {
        const spy2 = jest.spyOn(board, 'provideClickedImgSrc')
        const imgTest = board.provideClickedImgSrc(0)
        expect(imgTest).toEqual({src: 'data:image/jpeg;base64, def', num: 2})
    })


    test("clickedImg has no element", () => {
        clickedImgs = [];
        const spy3 = jest.spyOn(board, 'provideClickedImgSrc')
        const imgTest = board.provideClickedImgSrc(0)
        expect(typeof imgTest).toBe('object')
        expect(imgTest.hasOwnProperty('src')).toBeTruthy()
        expect(imgTest.hasOwnProperty('num')).toBeTruthy()
    })

})