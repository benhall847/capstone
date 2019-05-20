import React, { Component } from 'react'
import {View, Text} from 'react-native'
import Row from './Row'
import {Figures} from '../assets/figures/Figures'



export class Tetris extends Component {
    constructor(props){
        super(props);
        this.state={
            board:[],
            height:15,
            width:10,
            currentFigure:null,
            nextFigure:null,
            score:0,
            isLoser:false,
            isWinner:false,
            gameSpeed:1000,
            defaultSpeed:1000,
            fastSpeed:100,

        }
    }
    componentDidMount(){
        this._createBoard()
    }


    _mapFirstPieceToBoard= ()=>{
        let myFigure = Figures[6];
        let updatedBoard = this.state.board;
        myFigure.path.forEach((eaArray)=>{
            updatedBoard[eaArray[1]][eaArray[0]] = {...myFigure, active:'active'}
        })

        this.setState({board:updatedBoard, currentFigure:myFigure}, this._gameLoop)
    }



    _createBoard = ()=>{
        const {board, height, width} = this.state
        let newBoard = []
        for (let y = 0; y < height; y++){
            newBoard.push([])
            for (let x = 0; x< width; x++){
                newBoard[y][x] = {
                                    type:'empty',
                                    active: ''
                                }
            }
        }

        this.setState({board:newBoard}, this._mapFirstPieceToBoard)
    }
    _returnBoard = ()=>{
        return (this.state.board.map((eaRow, i)=><Row row={eaRow} key={i}/>))
    }

    _gameLoop = ()=>{
        this.setState({
            interval:setInterval(()=>{
                this._moveFigure()

            }, this.state.gameSpeed)
        })
    }
    _moveFigure = ()=>{
        let freezeFlag = false
        if (!freezeFlag){
            let stepFigure = {...this.state.currentFigure}
            stepFigure.path = stepFigure.path.map((eaPathArray)=>{
                return [eaPathArray[0], eaPathArray[1] + 1]
            })



            this.setState({currentFigure:{...stepFigure}}, this._updateBoard)
        }
    }
    _updateBoard = ()=>{
        const {currentFigure} = this.state
        console.log(currentFigure)
        let activeBoard = this.state.board.map(row =>{
            return row.map(eaObj => eaObj.active === 'active' ? {type:'empty', active:''} : eaObj)
        })
        // console.log(activeBoard)
        // console.log(currentFigure)
        this.state.currentFigure.path.forEach(eaPathArray=>{

                activeBoard[eaPathArray[1]][eaPathArray[0]] = {...currentFigure, active:'active'}

        })

        this.setState({
            board:activeBoard,
            
        })
    }
    


    render() {
        return (
        <View style={styles.boardContainer}>
            {this.state.board.length > 0 ? this._returnBoard() : null}
        </View>
        )
    }
}

const styles ={
    boardContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
}

export default Tetris
