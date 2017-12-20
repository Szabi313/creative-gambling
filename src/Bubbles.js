import React, { Component } from 'react';
import StartButton from './StartButton';
//import basicData from './bubbles-data'
import BubbleCSSTransition from './BubbleCSSTransition';
import Loader from './Loader'

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

        this.imageData = {
            images: [],
            listUrl: 'https://picsum.photos/list',
            imgUrl: 'https://picsum.photos/200/200?image=',
            playingSymbols: [],
            playingImages: []
        }

        this.gameConfig = {
            playingSymbolsNum: 10,
            symbolsNumToWin: 3,
            symbolsToBeChoosen: 5,
            winner: false
        }

        this.state = {
            bubbles: this.blowBubblesData(25),
            showLoader: true,
            showStartButton: false,
        }

        this.usedImages = []

    }


    componentDidMount(){
        //this.setState({show: true})
        fetch(this.imageData.listUrl)
            .then(res => {
                return res.json()
                //console.log('1')
                //console.log(res)
            })
            .then((result) => {
                //console.log('2')
                console.log(result)
                this.imageData.images = result
                //this.setState({showLoader: false, showStartButton: true})
                this.chooseSymbols({symbolNum: this.gameConfig.playingSymbolsNum})
                console.log(this.imageData.playingSymbols)
                //console.log(this.imageData.imgUrl + this.imageData.images[this.imageData.playingSymbols[0]].id)
                this.loadImages()
                console.log(this.chooseWinerIfThereIs())
            },
                (error) => {
                    console.log(error)
                }
             )
    }


    loadImages = () => {
        let count = 0;
        for(let i = 0; i < this.imageData.playingSymbols.length; i++) {
            fetch(this.imageData.imgUrl + this.imageData.images[this.imageData.playingSymbols[0]].id)
                .then(res => res.blob())
                .then((result) => {
                        //console.log(result)
                        this.imageData.playingImages.push(result)
                        count++
                        if(count === this.imageData.playingSymbols.length)console.log(this.imageData.playingImages)
                        this.setState({showLoader: false, showStartButton: true})
                        this.gameConfig.winner = this.chooseWinerIfThereIs();
                    },
                    (error) => console.log(error)
                )
        }
    }


    chooseSymbols = (args) => {
        for(let i = 0; i < args.symbolNum; i++){
            this.pushSymbol()
        }
    }


    pushSymbol = () => {
        let number = Math.floor(Math.random() * this.imageData.images.length);
        //console.log(number)
        if(this.imageData.playingSymbols.indexOf(number) < 0)this.imageData.playingSymbols.push(number);
        else this.pushSymbol();
    }


    chooseWinerIfThereIs = () => {
        if(Math.random() < 0.5){
            return Math.floor(Math.random() * this.gameConfig.playingSymbolsNum)
        }
        else return false;
    }


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

        this.setState({bubbles: bubblesData, showStartButton: false})

        //console.log(this.state.bubbles)
    }


    /*makeBubbles = () => {
        return this.state.bubbles.map((item, i) => (


            <BubbleCSSTransition key={i} id={i} in={item.show} style={{left: `${20}%`, width: `${item.size}px`,
            height: `${item.size}px`, animationDelay: `${item.timeout}ms`}}/>
        ))
    }*/


    clickBubble = (e) => {
        //console.log(Math.floor(Math.random() * (this.imageData.playingSymbols.length-1)))
        //console.log(this.imageData.images[this.imageData.playingSymbols[Math.floor(Math.random() * (this.imageData.playingSymbols.length-1))]].id)

        

        e.target.style.backgroundImage = `url('https://picsum.photos/200/200?image=${
            this.imageData.images[this.imageData.playingSymbols[Math.floor(Math.random() * (this.imageData.playingSymbols.length-1))]].id
        }')`
    }


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
                                animationDelay: `${item.timeout}ms` }}
                            onClick={this.clickBubble}
                        />
                    ))
                }
                <StartButton onClick={this.startGame} show={this.state.showStartButton}/>
                <Loader show={this.state.showLoader}/>
            </div>
        )
    }
}

export default Bubbles;
