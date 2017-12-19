import React, { Component } from 'react';
import Bubble from './Bubble';
//import {Transition, TransitionGroup} from 'react-transition-group';
import StartButton from './StartButton';
//import basicData from './bubbles-data'
import BubbleCSSTransition from './BubbleCSSTransition'

class Bubbles extends Component{
    constructor(props){
        super(props);
        //this.setRandomLeft = this.setRandomProperty.bind(this);

        this.bubbleObjectBasicData = {
            show: false,
            id: undefined,
            left: {max: 80},
            duration: {max: 4000, min: 2000},
            size: {max: 200, min: 100},
            timeout: {max: 1000, min: 500},
        }

        this.state = {
            bubbles: this.blowBubblesData(25),
            //in: false
        }

        /*setInterval(() => {

            //let bubbles = this.state.bubbles;

            let bubbles = this.state.bubbles.map((elem) => {
                elem.show = false;
                return elem;
            })

            this.setState({ bubbles: bubbles })
            this.startGame();
        }, 5000)*/
    }

    /*componentDidMount = () => {
        //this.blowBubbles(3);
        console.log(this.state)
    }*/

    setRandomProperty = (settings) => {
        const min = settings.min || 0;
        const max = settings.max-min || 0;
        return Math.floor(max*Math.random()) + min;
    }

    blowBubblesData = (num, from) => {
        const bubbles = [];
        //const bubble {};
        for(let i=/*from ||*/ 0; i<num/*+(from || 0)*/; i++) {
            bubbles.push({
                show: false,
                id: i,
                left: this.setRandomProperty(this.bubbleObjectBasicData.left),
                duration: this.setRandomProperty(this.bubbleObjectBasicData.duration),
                size: this.setRandomProperty(this.bubbleObjectBasicData.size),
                timeout:  i*500 + this.setRandomProperty(this.bubbleObjectBasicData.timeout),
            })
        }

        //this.setState({bubbles: bubbles});
        return bubbles;
    }

    handleClickBubble = (e) => {
        console.log("Bubble clicked. id: " + e.target.id);
        //console.log(e.FlyUp);

        let bubblesData = this.state.bubbles;
        bubblesData[e.target.id].show = false;

        this.setState(
            {bubbles: bubblesData}
        )
    }

    startGame = () => {
        //if(!this.state.in)this.setState({in: true})

        let bubblesData = this.state.bubbles;

        bubblesData = bubblesData.map(
            (elem) => {
                elem.show = true;
                return elem;
            }
        )

        this.setState({bubbles: bubblesData})

        console.log(this.state.bubbles)
    }


    /*makeBubbles = () => {
        return this.state.bubbles.map((item, i) => (


            <BubbleCSSTransition key={i} id={i} in={item.show} style={{left: `${20}%`, width: `${item.size}px`,
            height: `${item.size}px`, animationDelay: `${item.timeout}ms`}}/>
        ))
    }*/


    render(){

        return(
            <div>
                {
                    this.state.bubbles.map((item, i) => (
                        <BubbleCSSTransition
                            in={item.show}
                            key={i}
                            style={{
                                left: `${item.left}%`,
                                width: `${item.size}px`,
                                height: `${item.size}px`,
                                animationDelay: `${item.timeout}ms` }}/>
                    ))
                }
                <StartButton onClick={this.startGame}/>
            </div>
        )
    }
}

export default Bubbles;
