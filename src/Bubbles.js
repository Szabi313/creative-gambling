import React, { Component } from 'react';
import StartButton from './StartButton';
//import basicData from './bubbles-data'
import BubbleCSSTransition from './BubbleCSSTransition';
import Loader from './Loader';
//import NewGame from './NewGame'
import WinnerTitle from './WinnerTitle'

class Bubbles extends Component{
    constructor(props){
        super(props);

    //game UI config from backend
        this.bubbleObjectBasicData = {
            show: false,
            id: undefined,
            left: {max: 80},
            duration: {max: 4000, min: 2000},
            size: {max: 200, min: 100},
            timeout: {max: 1000, min: 500},
            basicTimeout: 500
        }

    //image settings from json file (this is default)
        this.imageData = {
            // images: [],
            // listUrl: 'https://picsum.photos/list',
            // imgUrl: 'https://picsum.photos/200/200?image=',
            // playingSymbols: [],
            // playingImages: [],
            // base64Flag:  'data:image/jpeg;base64,'
        }

    //game config from backend (this is default)
        this.gameConfig = {
            // playingSymbolsNum: 10,
            // symbolsNumToWin: 5,
            // symbolsToBeChoosen: 10,
            // winner: false,
            // oddsToWin: 0.5
        }

        // if(this.gameConfig.symbolsToBeChoosen <= 1)this.gameConfig.symbolsToBeChoosen = 2;
        // if(this.gameConfig.symbolsNumToWin >= this.gameConfig.symbolsToBeChoosen)this.gameConfig.symbolsNumToWin = this.gameConfig.symbolsToBeChoosen-1;
        // if(this.gameConfig.playingSymbolsNum < (this.gameConfig.symbolsToBeChoosen - this.gameConfig.symbolsNumToWin)*(this.gameConfig.symbolsNumToWin - 1)+1);

        this.state = {
            bubbles: this.blowBubblesData(25),
            showLoader: true,
            showStartButton: false,
            showNewGameButton: false,
            showWinnerTitle: false,
            winnerTitleSrc: ''
        }

        this.usedImages = [];
        this.usedBubbles = [];
        this.counter = 0;
        this.winnerPlaces = [];
    }


    componentDidMount(){
        fetch('imageData.json')
            .then(res => {
                //console.log(res.json())
                return res.json()
            })
            .then(res => {
                //console.log(res)
                this.imageData = res
                console.log(this.imageData)
                return res
            })
            .then(res => fetch('gameConfig.json'))
            .then(res => res.json())
            .then(res => {
                this.gameConfig = res
                console.log(this.gameConfig)

                return res
            })

            .then(res => fetch('bubbleObjectBasicData.json'))
            .then(res => res.json())
            .then(res => {
                this.bubbleObjectBasicData = res

                console.log(this.bubbleObjectBasicData)
                return res
            })

            .then(res => fetch(this.imageData.listUrl))
        //fetch(this.imageData.listUrl)
            .then(res => {
                return res.json()
            })
            .then((result) => {
                console.log(result)
                this.imageData.images = result
                this.chooseSymbols({symbolNum: this.gameConfig.playingSymbolsNum})
                console.log(this.imageData.playingSymbols)
                this.loadImages()
            },
                (error) => {
                    console.log(error)
                }
             )

    }


    loadImages = () => {
        let count = 0;
        for(let i = 0; i < this.imageData.playingSymbols.length; i++) {
            fetch(this.imageData.imgUrl + this.imageData.images[this.imageData.playingSymbols[i]].id)
                .then(res => res.arrayBuffer()) //blob())
                .then((result) => {
                        //var base64Flag =  'data:image/jpeg;base64,';

                        var binary = '';
                        var bytes = [].slice.call(new Uint8Array(result));

                        bytes.forEach((b) => binary += String.fromCharCode(b))

                        var imageStr = window.btoa(binary);

                        //console.log(imageStr);

                        this.imageData.playingImages.push(imageStr /*result*/)
                        count++
                        if(count === this.imageData.playingSymbols.length)this.setState({showLoader: false, showStartButton: true}) //console.log(this.imageData.playingImages)

                    },
                    (error) => console.log(error)

                )
        }
    }


    chooseSymbols = (args) => {
        for(let i = 0; i < args.symbolNum; i++){
            this.pushSymbol({maxNum: this.imageData.images.length, arrayToPush: this.imageData.playingSymbols, maxNumOfItemsAllowed: 1})
        }
    }


    pushSymbol = (options) => {
        let number = Math.floor(Math.random() * options.maxNum);
        if(options.transformNumberCB)number = options.transformNumberCB(number) || number;
        if(/*options.arrayToPush.indexOf(number)*/ this.elementsCounter(options.arrayToPush, number) < options.maxNumOfItemsAllowed){
            options.arrayToPush.push(number);
            return number
        }
        else return this.pushSymbol(options);
    }


    chooseWinerIfThereIs = () => {
        if(Math.random() < this.gameConfig.oddsToWin){
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
        let bubbles = [];
        for(let i=/*from ||*/ 0; i<num/*+(from || 0)*/; i++) {
            bubbles.push({
                show: false,
                id: i,
                key: i,
                left: this.setRandomProperty(this.bubbleObjectBasicData.left),
                duration: this.setRandomProperty(this.bubbleObjectBasicData.duration),
                size: this.setRandomProperty(this.bubbleObjectBasicData.size),
                timeout:  i*this.bubbleObjectBasicData.basicTimeout + this.setRandomProperty(this.bubbleObjectBasicData.timeout),
            })
        }
        return bubbles;
    }


    startGame = () => {
        this.setState({
            showWinnerTitle: false,
            winnerTitleSrc: ''
        })
        this.winnerPlaces = [];
        this.gameConfig.winner = this.chooseWinerIfThereIs();

        /*for(let j = 0; j < this.gameConfig.symbolsNumToWin; j++){
            this.usedImages.push(this.gameConfig.winner)
        }*/

        console.log(this.gameConfig.winner)

        if(this.gameConfig.winner !== false){
            for(let i = 0; i < this.gameConfig.symbolsNumToWin; i++) {
                this.usedImages.push(this.gameConfig.winner)

                this.pushSymbol({
                    maxNum: this.gameConfig.symbolsToBeChoosen,
                    arrayToPush: this.winnerPlaces,
                    maxNumOfItemsAllowed: 1
                })
            }

            this.winnerPlaces = this.winnerPlaces.sort()
        }

        console.log(this.winnerPlaces)

        if(this.counter) {
            let realBubbles = document.querySelectorAll('.base');

            realBubbles.forEach((item, i) => {
                item.style.backgroundImage = 'none';
                item.style.background = 'radial-gradient(lightblue 25%, deepskyblue 75%)';
                item.style.animationDelay = `${
                item.id * this.bubbleObjectBasicData.basicTimeout + this.setRandomProperty(
                    this.bubbleObjectBasicData.timeout)}ms`;
                item.style.bottom = "-30%";
                item.style.zIndex = 1000
            })
        }

        this.usedBubbles = [];

        let bubblesData = this.state.bubbles;

        this.counter = 0;

        bubblesData = bubblesData.map(
            (elem) => {
                elem.show = true;
                return elem;
            }
        )


        this.setState({bubbles: bubblesData, showStartButton: false})
    }


    elementsCounter = (arrayToSearch, itemToSearchFor) => {
        let counter = 0
        arrayToSearch.forEach(item => {
            if(item == itemToSearchFor)counter++
        })
        return counter;
    }


    clickBubble = (e) => {
        //console.log(e.target.id)
        if(this.usedBubbles.indexOf(e.target.id) >= 0)return;
        else this.usedBubbles.push(e.target.id);

        this.counter++;

        let choosed = this.pushSymbol({
            arrayToPush: this.usedImages,
            maxNumOfItemsAllowed: this.gameConfig.symbolsNumToWin-1,
            maxNum: this.imageData.playingSymbols.length-1,
            //transformNumberCB: (num) => {return this.imageData.playingSymbols[num]}
        })

        console.log(this.usedImages)
        //console.log(choosed)
        //console.log(this.imageData.playingImages[choosed])

        if(this.gameConfig.winner === false
            || (this.gameConfig.winner !== false && this.winnerPlaces.indexOf(this.counter-1) < 0)){
            e.target.style.backgroundImage =
                //`url('https://picsum.photos/200/200?image=${this.imageData.images[choosed].id}')`
                `url('${this.imageData.base64Flag} ${this.imageData.playingImages[choosed]}')`
        }
        else{
            e.target.style.backgroundImage =
                //`url('https://picsum.photos/200/200?image=${this.imageData.images[this.imageData.playingSymbols[this.gameConfig.winner]].id}')`
                `url('${this.imageData.base64Flag} ${this.imageData.playingImages[this.gameConfig.winner]}')`
            if(this.winnerPlaces.indexOf(this.counter-1) == this.winnerPlaces.length-1){
                console.log("*** WINNER ***")
                let originalZindex = e.target.style.zIndex
                e.target.style.zIndex = 100001
                //setInterval(() => e.target.style.zIndex = originalZindex, 2000)
                this.setState({
                    showWinnerTitle: true,
                    winnerTitleSrc: this.imageData.base64Flag + this.imageData.playingImages[this.gameConfig.winner]
                })
            }
        }



        if(this.counter === this.gameConfig.symbolsToBeChoosen
            || (this.winnerPlaces.length && this.winnerPlaces.indexOf(this.counter-1) == this.winnerPlaces.length-1)){


            let bubbles = this.state.bubbles;
            bubbles = bubbles.map((item) => {
                item.show = false
                return item
            })

            this.usedImages = []
            this.setState({showStartButton: true})
            return
        }
    }

    toggleWinnerTitle = () => {
        this.setState(prevState => ({showWinnerTitle: !prevState.showWinnerTitle}))
    }


    render(){


        this.bubbleList = this.state.bubbles.map((item, i) => (
            <BubbleCSSTransition
                in={item.show}
                key={i}
                id={i}
                style={{
                    left: `${item.left}%`,
                    width: `${item.size}px`,
                    height: `${item.size}px`,
                    animationDelay: `${item.timeout}ms` }}
                onClick={this.clickBubble}
            />
        ))


        return(
            <div className="gameContainer">
                {
                    this.bubbleList
                }
                <StartButton onClick={this.startGame} show={this.state.showStartButton}/>
                <WinnerTitle show={this.state.showWinnerTitle} src={this.state.winnerTitleSrc} toggle={this.toggleWinnerTitle}/>


                <Loader show={this.state.showLoader}/>
            </div>
        )
    }
}

export default Bubbles;