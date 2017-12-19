import React, { Component } from 'react';
import './bubble.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './BubbleCSSTransition.css'


const FlyUp = ({children, ...props}) => (
    <CSSTransition
        {...props}

        classNames='fly'
    >
        {children}
    </CSSTransition>
)

class BubbleCSSTransition extends Component{
    constructor(...args){
        super(...args)
        this.state = {show: args.in}
    }

    /*componentDidMount(){
        this.setState({show: true})
    }*/

    clickBubble = (e) => {
        let computedStyle = window.getComputedStyle(e.target)
        let bottom = computedStyle.getPropertyValue('bottom')
        e.target.classList.remove('fly-enter');

        e.target.style.bottom = bottom
        this.setState({show: false})
        e.target.style.background = 'none'
        e.target.style.backgroundColor = '#aaa'
    }

    render(){
        return(
            <FlyUp in={this.props.in}>
                <div id={1} className="base" onClick={this.clickBubble} style={this.props.style}></div>
            </FlyUp>
        )
    }
}

export default BubbleCSSTransition