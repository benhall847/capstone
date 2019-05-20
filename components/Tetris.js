import React, { Component } from 'react';
import { View, PanResponder, Dimensions, TouchableOpacity } from 'react-native';
import Row from './Row';
import { Figures } from '../assets/figures/Figures';





export class Tetris extends Component {
    constructor(props){
        super(props);
        this.position = (0, 0);
        this.state={
            board:[],
            height:15,
            width:10,
            currentFigure:null,
            nextFigure:null,
            score:0,
            isLoser:false,
            isWinner:false,
            gameSpeed:100000,
            defauldtSpeed:1000,
            fastSpeed:100,

        }
    }
    
    componentDidMount(){
        this._createBoard(),
        this._panResponder =  () => {PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
            //     this.position.setValue({x: gestureState.dx, y: gestureState.dy})
            // }, onPanResponderRelease: (evt, gestureState) => {
            //     if (gestureState.dy > -12) {
            //         console.log('swiped up');
            //     }
                console.warn("Swipe Moves", gestureState);
            
            }       
        });}
    }
    // _panResponder = PanResponder.create({
    //     onStartShouldSetPanResponder: (evt, gestureState) => true,
    //     onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    //     onMoveShouldSetPanResponder: (evt, gestureState) => true,
    //     onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

    //     onPanResponderGrant: (evt, gestureState) => {
    //         console.log('Grant');
    //     },
    //     onPanResponderMove: (evt, gestureState) => {
    //         console.log('Move');
    //     },
    //     onPanResponderTerminationRequest: (evt, gestureState) => true,
    //     onPanResponderRelease: (evt, gestureState) => {
    //         console.log('Release');
    //     },
    //     onPanResponderTerminate: (evt, gestureState) => {
    //         return true;
    //     }
    // })


    _mapFirstPieceToBoard= ()=>{
        let myFigure = Figures[Math.floor(Math.random() * 18)];
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

    // _moveFast = (e) => {
    //     // if they swipe down
    //     //then gameSpeed = this.state.fastSpeed
    // }
    


    render() {
        return (
        // <View style={styles.boardContainer} {...this._panResponder.panHandlers}>
        <View style={styles.boardContainer} >
            {this.state.board.length > 0 ? this._returnBoard() : null}
            {/* <View {...this._panResponder.panHandlers}> */}
            
                 
            {/* </View> */}
         {/* <TouchableOpacity  onPress={() => {
                console.log('you pressed the Touch');
            }}>
                <Image style={styles.img} source={require('../images/robots-dev.png')}/>
            </TouchableOpacity> */}
        </View>
        )
    }
}

const styles ={
    boardContainer: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
}

export default Tetris
