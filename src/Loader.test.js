import React from 'react';
import ReactDOM from 'react-dom';
import Loader from "./Loader";

it("renders loader", () => {
    const test_div = document.createElement('div');
    ReactDOM.render(<Loader show={true}/>, test_div);
})