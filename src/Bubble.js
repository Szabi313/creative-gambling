import React, { Component } from 'react';
import './bubble.css';
import { Transition, TransitionGroup } from 'react-transition-group';

const duration = 3000;


/*const transitionStyles = {
    entering: {bottom: '-20%'},
    entered: {bottom: '120%'},
    //exited: {bottom: '-20%'}
};*/

const FlyUp = ({in: inProp, left: leftVal, duration: durVal, size: sizeVal, timeout: delayVal, id: idVal, key: keyVal,
                   transition: transitionData, onEntering: handleOnEntering}) => (
    <Transition in={inProp} timeout={delayVal} onEntering={handleOnEntering}>
        {(state) => (
            console.log(`State: ${state}`),

            <div className="bubble" style={{
                transition: `bottom ${durVal}ms ease-in`,
                left: `${leftVal}%`,
                width: `${sizeVal}px`,
                height: `${sizeVal}px`,
                ...transitionData[state],
            }} id={idVal}
                 >

            </div>
        )}
    </Transition>
)

class Bubble extends Component{

    constructor(props){
        super(props);
        this.state = {
            show: this.props.in,
            transition: {
                entering: {bottom: '-20%'},
                entered: {bottom: '120%'},
                exited: {bottom: '-30%'}
            }
        }
    }


    componentDidMount(){
        /*setInterval(() => {
            console.log(`Duration: ${this.props.duration}, delay: ${this.props.timeout}`)
        }, 5000)*/
    }


    handleClick = (e) => {
        let transition = this.state.transition;
        transition.exited = {bottom: 0}
        this.setState({transition: transition})
        //console.log(e.target.style)
        this.props.onClick(e);
    }


    handleOnEntering = () => {
        console.log(`dur: ${this.props.duration}, delay: ${this.props.timeout}`);
        const interval = this.props.duration + this.props.timeout;
    }


    render(){
        return (
            <TransitionGroup>
                <div onClick={this.handleClick}>
                    <FlyUp id={this.props.id} in={!!this.props.in}
                           left={this.props.left} duration={this.props.duration} size={this.props.size}
                           timeout={this.props.timeout} transition={this.state.transition}
                           onEntering={this.handleOnEntering}
                    />
                </div>
            </TransitionGroup>
        )
    }
}

export default Bubble;