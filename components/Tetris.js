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
            interval:null

        }
    }
    componentDidMount(){
        this._createBoard()
    }


    _mapFirstPieceToBoard= ()=>{
        let randomFigure = Figures[Math.floor(Math.random() * Figures.length)]
        let updatedBoard = this.state.board;
        randomFigure.path.forEach((eaArray)=>{
            updatedBoard[eaArray[1]][eaArray[0]] = {...randomFigure, active:'active'}
        })

        this.setState({board:updatedBoard, currentFigure:randomFigure}, this._gameLoop)
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
                this._loopLogic()

            }, this.state.gameSpeed)
        })
    }
    
    _loopLogic = ()=>{
        let isFigureMovable = this._isFigureMovable()
        if(this.state.currentFigure){
            this._checkForNextFigure()
            
            if (isFigureMovable){
                this._moveCurrentFigure()
            
            }else{
                let filledBoard = this.state.board.map(eaRow => eaRow.map(eaCell => eaCell.active === 'active' ? {...eaCell, active:'filled'} : eaCell))

                this.setState({
                    currentFigure:this.state.nextFigure,
                    board:filledBoard,
                    nextFigure:null
                })
            }
        
        } else{
            let randomFigure = Figures[Math.floor(Math.random() * Figures.length)]
            this.setState({currentFigure:randomFigure})
        }
        this._updateBoard()
    }

    _moveCurrentFigure = ()=>{
        let stepFigure = {...this.state.currentFigure}
        stepFigure.path = stepFigure.path.map((eaPathArray)=>{
            return [eaPathArray[0], eaPathArray[1] + 1]
        })
        this.setState({currentFigure:{...stepFigure}})
    }


    _checkForNextFigure = ()=>{
        if (!this.state.nextFigure){

            let randomFigure = Figures[Math.floor(Math.random() * Figures.length)]

            this.setState({nextFigure:{...randomFigure}})
        }
    }

    _isFigureMovable = ()=>{
        let isMovable = true
        this.state.board.map((eaRow, rowIndex)=>{
            eaRow.map((eaCell, cellIndex)=>{
                this.state.currentFigure.path.map(activeCell =>{

                    let isBoardCellFilled = (eaCell.active === 'filled')
                    let willFigureCollide = (activeCell[0] === cellIndex && activeCell[1] + 1 === rowIndex)
                    let willBoardEnd = (activeCell[1]+1 === this.state.board.length)

                    if(willBoardEnd){
                        isMovable = false
                    }
                    if (isBoardCellFilled && willFigureCollide){
                        isMovable = false
                    }
                })
            })
        })
        return isMovable
    }
    _updateBoard = ()=>{
        const {currentFigure} = this.state
        let activeBoard = this.state.board.map(row =>{
            return row.map(eaObj => eaObj.active === 'active' ? {type:'empty', active:''} : eaObj)
        })
        // console.log(activeBoard)
        // console.log(currentFigure)
        let willCurrentFigureCollide = false
        this.state.currentFigure.path.map(eaPathArray=>{
            let eaCell = activeBoard[eaPathArray[1]][eaPathArray[0]]
            if(eaCell.active !== 'filled'){
                activeBoard[eaPathArray[1]][eaPathArray[0]] = {...currentFigure, active:'active'}
                
            }else{
                clearInterval(this.state.interval)
                this.setState({isLoser:true})
                willCurrentFigureCollide = true
                
            }
            
                
        })
        if(!willCurrentFigureCollide){
            this.setState({
                board:activeBoard
            })
        }


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



