import React, { Component } from 'react';
import './bubble.css';
import { Transition, TransitionGroup } from 'react-transition-group';

const duration = 3000;


/*const transitionStyles = {
    entering: {bottom: '-20%'},
    entered: {bottom: '120%'},
    //exited: {bottom: '-20%'}
};*/

const FlyUp = ({in: inProp, left: leftVal, duration: durVal, size: sizeVal, timeout: delayVal, id: idVal, key: keyVal, transition: transitionData, addEndListener: aelVal, addEndListener: endListenerFunc}) => (
    <Transition in={inProp} timeout={delayVal}>
        {(state) => (
            console.log(`State: ${state}`),

            <div className="bubble" style={{
                transition: `bottom ${durVal}ms ease-in`,
                left: `${leftVal}%`,
                width: `${sizeVal}px`,
                height: `${sizeVal}px`,
                ...transitionData[state],
            }} id={idVal}
                 addEndListener={(node, done) => {node.addEventListener('transitionend', endListenerFunc, false)}}></div>
        )}
    </Transition>
)

class Bubble extends Component{

    constructor(props){
        super(props);
        this.state = {
            show: false,
            transition: {
                entering: {bottom: '-20%'},
                entered: {bottom: '120%'},
                exited: {bottom: '-30%'}
            }
        }
    }


    handleClick = (e) => {
        let transition = this.state.transition;
        transition.exited = {bottom: 0}
        this.setState({transition: transition})
        this.props.onClick(e);
    }

    endTransition = () => {
        console.log("END");
    }


    render(){
        return (
            <TransitionGroup>
                <div onClick={this.handleClick}>
                    <FlyUp addEndListener={this.endTransition()} id={this.props.id} in={!!this.props.in} left={this.props.left} duration={this.props.duration} size={this.props.size} timeout={this.props.timeout} transition={this.state.transition}/>
                </div>
            </TransitionGroup>
        )
    }
}

export default Bubble;