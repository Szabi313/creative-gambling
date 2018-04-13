import React, {Component} from 'react'
import ClickedSymbol from './ClickedSymbol';
import './board.css'


class Board extends Component{
    constructor(props){
        super(props);
    }


    provideClickedImgSrc = imgNum => {
        if(this.props.clickedImgs.length)return {
            src: `data:image/jpeg;base64, ${this.props.playingImgs[this.props.clickedImgs[imgNum].src]}`,
            num: this.props.clickedImgs[imgNum].num
        }
        else return {src: '', num: 0}
    }


    render(){

        //console.log(this.provideClickedImgSrc(0).src)
        //let line;
        let clickedImgList = this.props.clickedImgs.map(
            (item, i) => {
                //console.log(i);
                return (<ClickedSymbol clickedImg={this.provideClickedImgSrc(i).src} clickNum={this.provideClickedImgSrc(i).num}/>)
            }
        )

        // let clickedImgList = [];
        // clickedImgList.push(<ClickedSymbol clickedImg={this.provideClickedImgSrc(0).src} clickNum={this.provideClickedImgSrc(0).num}/>)
        // if(this.provideClickedImgSrc(1))clickedImgList.push(<ClickedSymbol clickedImg={this.provideClickedImgSrc(0).src} clickNum={this.provideClickedImgSrc(0).num}/>)


            return(this.props.show &&
                <div className="boardContainer">
                    <div className="inside">
                        <h4>Score</h4>
                        {clickedImgList}
                    </div>
                </div>
            )

    }
}

export default Board;