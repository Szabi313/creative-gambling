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


    clickBubble = (e) => {
        let computedStyle = window.getComputedStyle(e.target)
        let bottom = computedStyle.getPropertyValue('bottom')
        e.target.classList.remove('fly-enter');
        e.target.classList.remove('fly-enter-active');


        e.target.style.bottom = bottom
        this.setState({show: false})
        //e.target.style.background = 'none'
        //e.target.style.backgroundColor = '#aaa'
        //e.target.style.opacity = 1;
        //this.setState({show: false})
        e.target.classList.add('fly-exit');
        e.target.classList.add('fly-exit-active');
        //e.target.style.backgroundImage = "url('https://picsum.photos/200/200?image=0')"
        e.target.style.backgroundSize = 'cover'
        e.target.style.zIndex = 1
        e.target.style.animationDelay = '0ms';
        this.props.onClick(e)
    }

    render(){
        return(


            <FlyUp in={this.props.in}>
                <div id={this.props.id} className="base" onClick={this.clickBubble} style={this.props.style}></div>
            </FlyUp>
        )
    }
}

export default BubbleCSSTransition